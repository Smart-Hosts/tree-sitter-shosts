package tree_sitter_shosts_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_shosts "github.com/smart-hosts/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_shosts.Language())
	if language == nil {
		t.Errorf("Error loading Shosts grammar")
	}
}
