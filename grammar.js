/**
 * @file Smart Hosts file
 * @author Jade Lin <linw1995@icloud.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "shosts",

  extras: $ => [
    $.comment,
    /\s/,
  ],
  rules: {
    source_file: $ => repeat(seq($._instruction, "\n")),
    _instruction: $ => choice(
      $.rule,
    ),
    rule: $ => seq(
      $.action,
      $.domains,
      optional(seq(token.immediate(","), $.condition)),
    ),
    action: $ => choice(
      $.ip,
    ),
    ip: () => /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,

    domains: $ => repeat1($.domain),
    domain: () => /[a-zA-Z0-9\.\-\[\]\?\*\\]+/,

    condition: $ => choice(
      $.cond_ssid,
    ),
    cond_ssid: $ => seq(
      alias(/[sS][sS][iI][dD]/, "SSID"), token.immediate("="), $.double_quoted_string
    ),

    double_quoted_string: () =>
      seq(
        '"',
        token.immediate(/[^"\n\\\$]+/),
        '"'
      ),

    comment: () => /#.*/,
  }
});
