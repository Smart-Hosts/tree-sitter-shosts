import XCTest
import SwiftTreeSitter
import TreeSitterShosts

final class TreeSitterShostsTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_shosts())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Shosts grammar")
    }
}
