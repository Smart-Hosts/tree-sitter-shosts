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
    // TODO: add the actual grammar rules
    source_file: $ => seq($._instruction, optional(repeat(seq("\n", $._instruction)))),
    _instruction: $ => choice(
      $.rule,
    ),
    rule: $ => seq(
      $.action,
      $.domains,
      optional(seq(",", $.condition)),
    ),
    action: $ => choice(
      $.ip,
    ),
    ip: () => /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,

    domains: $ => repeat1($.domain),
    domain: () => /[a-zA-Z0-9\.\-]+/,

    condition: $ => choice(
      $.cond_ssid,
    ),
    cond_ssid: $ => seq(
      "ssid=", $.double_quoted_string
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
