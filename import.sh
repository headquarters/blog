ruby -rubygems -e 'require "jekyll-import";
    JekyllImport::Importers::Tumblr.run({
      "url"            => "http://michaelehead.com",
      "format"         => "md", # or "md"
      "grab_images"    => false,  # whether to download images as well.
      "add_highlights" => true,  # whether to wrap code blocks (indented 4 spaces) in a Liquid "highlight" tag
      "rewrite_urls"   => true   # whether to write pages that redirect from the old Tumblr paths to the new Jekyll paths
    })'