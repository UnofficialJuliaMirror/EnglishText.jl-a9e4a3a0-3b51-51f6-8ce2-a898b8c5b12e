var documenterSearchIndex = {"docs":
[{"location":"#EnglishText.jl-Documentation-1","page":"Home","title":"EnglishText.jl Documentation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Many applications display information to readers in prose format instead of tabular format. It is often important to generate human-readable, grammatically correct prose. However, taking care of grammatical special cases is tedious.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"EnglishText.jl solves this problem by providing a variety of convenient utility functions. It uses established algorithms where available. The precise methods used are documented in the modules themselves.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"EnglishText.jl uses a modular approach. Applications not requiring all the exports may use a submodule, such as EnglishText.ItemLists, instead of the entire package.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"EnglishText.jl aims to","category":"page"},{"location":"#","page":"Home","title":"Home","text":"provide a convenient, universally useful approach to abstracting away grammatical special cases\nbe self-documenting where possible, but well-documented nevertheless\nnot have unnecessary performance bottlenecks","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Note that this is not a natural language processing package and does not aim to include an English parser.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"","category":"page"},{"location":"#Indefinite-Article-Selection-1","page":"Home","title":"Indefinite Article Selection","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"indefinite","category":"page"},{"location":"#EnglishText.Articulate.indefinite","page":"Home","title":"EnglishText.Articulate.indefinite","text":"indefinite(word)\n\nDetermine the correct indefinite article, from “a” or “an”, for the given noun.\n\njulia> using EnglishText\n\njulia> indefinite(\"hour\")\n\"an\"\n\njulia> indefinite(\"hand\")\n\"a\"\n\n\n\n\n\n","category":"function"},{"location":"#Word-Representation-of-Numbers-1","page":"Home","title":"Word Representation of Numbers","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"english\nunenglish","category":"page"},{"location":"#EnglishText.Numeric.english","page":"Home","title":"EnglishText.Numeric.english","text":"english(n::Integer)\n\nConvert n to English, given that 0 le n  10^66.\n\njulia> using EnglishText\n\njulia> english(16)\n\"sixteen\"\n\n\n\n\n\n","category":"function"},{"location":"#EnglishText.Numeric.unenglish","page":"Home","title":"EnglishText.Numeric.unenglish","text":"unenglish(T <: Integer, data::AbstractString) → T\n\nConvert data to an integral type. This function has the guarantee that unenglish(Int, english(x)) == x, modulo any type differences. It is not guaranteed to work well or throw exceptions on other inputs.\n\njulia> using EnglishText\n\njulia> unenglish(Int, \"sixteen\")\n16\n\n\n\n\n\n","category":"function"},{"location":"#Quantities-and-Pluralization-1","page":"Home","title":"Quantities and Pluralization","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"ItemQuantity\nisempty(::ItemQuantity)\nlength(::ItemQuantity)\npluralize\nsingularize","category":"page"},{"location":"#EnglishText.Quantities.ItemQuantity","page":"Home","title":"EnglishText.Quantities.ItemQuantity","text":"ItemQuantity(n::Integer, item::AbstractString)\n\nRepresents a quantity of n occurrences of item. Although this is not a collection, for ease of use, it implements some of the standard collection methods length (for number of items) and isempty (for whether there are no items).\n\njulia> using EnglishText\n\njulia> ItemQuantity(2, \"apple\")\n2 apples\n\njulia> ItemQuantity(1, \"standard canine\")\n1 standard canine\n\n\n\n\n\n","category":"type"},{"location":"#Base.isempty-Tuple{ItemQuantity}","page":"Home","title":"Base.isempty","text":"isempty(quantity::ItemQuantity)\n\nReturn true if the given ItemQuantity represents no items.\n\njulia> using EnglishText\n\njulia> isempty(ItemQuantity(0, \"orange\"))\ntrue\n\njulia> isempty(ItemQuantity(4, \"person\"))\nfalse\n\n\n\n\n\n","category":"method"},{"location":"#Base.length-Tuple{ItemQuantity}","page":"Home","title":"Base.length","text":"length(quantity::ItemQuantity)\n\nReturn the number of items represented by this quantity.\n\njulia> using EnglishText\n\njulia> length(ItemQuantity(7, \"desk\"))\n7\n\n\n\n\n\n","category":"method"},{"location":"#EnglishText.Pluralize.pluralize","page":"Home","title":"EnglishText.Pluralize.pluralize","text":"pluralize(word; classical=true)\n\nPluralize a singular noun word (given in canonical capitalization) using heuristics and lists of exceptions. If word is not a singular noun, this function may give strange results.\n\nIf classical is set to true, then the classical (i.e. inherited from Latin or Greek) pluralization is chosen instead of the anglicized pluralization. As an example, the classical plural of \"vertex\" is \"vertices\", but the anglicized plural is \"vertexes\". By default, the classical pluralization is used.\n\njulia> using EnglishText\n\njulia> pluralize(\"fox\")\n\"foxes\"\n\njulia> pluralize(\"radius\")\n\"radii\"\n\njulia> pluralize(\"radius\", classical=false)\n\"radiuses\"\n\n\n\n\n\n","category":"function"},{"location":"#EnglishText.Pluralize.singularize","page":"Home","title":"EnglishText.Pluralize.singularize","text":"singularize(word)\n\nUnpluralize a plural noun (given in canonical capitalization) using heuristics and lists of exceptions. If the given word is not a plural noun, the result may be unpredictable.\n\njulia> using EnglishText\n\njulia> singularize(\"foxes\")\n\"fox\"\n\njulia> singularize(\"data\")\n\"datum\"\n\n\n\n\n\n","category":"function"},{"location":"#Lists-of-Nouns-and-Adjectives-1","page":"Home","title":"Lists of Nouns and Adjectives","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"ItemList","category":"page"},{"location":"#EnglishText.ItemLists.ItemList","page":"Home","title":"EnglishText.ItemLists.ItemList","text":"ItemList(objects, connective=Sum())\n\nA list of items or adjectives, which supports printing in standard English format. The first argument objects should be an iterator over some number of strings or other objects, including EnglishText.ItemQuantity objects.\n\nThe second argument connective should be one of:\n\nSum(), which represents a list of nouns in a collection of things\nDisjunction(), which represents a list of traits (typically adjectives or adverbs, but possibly also verbs or nouns) for which at least one should be satisfied\nConjunction(), which represents a list of traits that should all be satisfied\n\nIf omitted, connective is set to Sum().\n\njulia> using EnglishText\n\njulia> ItemList([\"apples\", \"oranges\"])\napples and oranges\n\njulia> ItemList([ItemQuantity(2, \"pencil\"), ItemQuantity(1, \"pen\")])\n2 pencils and 1 pen\n\njulia> ItemList([\"animal\", \"plant\"], Disjunction())\nanimal or plant\n\njulia> ItemList([\"red\", \"blue\", \"white\"], Conjunction())\nred, blue, and white\n\njulia> \"Help us use and test this software.\"\n\"Help us use and test this software.\"\n\n\n\n\n\n","category":"type"},{"location":"#Parsing-Sentences-1","page":"Home","title":"Parsing Sentences","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"sentences","category":"page"},{"location":"#EnglishText.Text.sentences","page":"Home","title":"EnglishText.Text.sentences","text":"sentences(text::AbstractString)\n\nReturn an iterable over the Sentences contained within text. Sentences are identified naïvely; that is, every full stop, exclamation mark, or question mark is considered to delimit a sentence. This is of course prone to error, as some full stops are used for abbreviations and not for delimiting sentences.\n\njulia> using EnglishText\n\njulia> for s in sentences(\"Hi! Iterate over sentences. OK?\")\n           println(s)\n       end\nHi!\nIterate over sentences.\nOK?\n\n\n\n\n\n","category":"function"},{"location":"#Internals-1","page":"Home","title":"Internals","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"SemanticText","category":"page"},{"location":"#EnglishText.Semantics.SemanticText","page":"Home","title":"EnglishText.Semantics.SemanticText","text":"An object representing a string of text but with additional semantic information. These objects convert to Strings through the string function, but also typically support other operations.\n\n\n\n\n\n","category":"type"},{"location":"#Citations-1","page":"Home","title":"Citations","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Conway, D. M. (1998, August). An algorithmic approach to english pluralization. In Proceedings of the Second Annual Perl Conference.","category":"page"}]
}