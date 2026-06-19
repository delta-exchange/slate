#!/usr/bin/env ruby

require 'yaml'

# Script to generate a combined markdown file from all documentation sources
# This creates a single file that users can download for use with LLMs

def read_yaml_frontmatter(content)
  if content =~ /\A(---\s*\n.*?\n?)^(---\s*$\n?)/m
    YAML.safe_load($1)
  else
    {}
  end
end

def strip_yaml_frontmatter(content)
  content.sub(/\A(---\s*\n.*?\n?)^(---\s*$\n?)/m, '')
end

def process_erb_includes(content, source_dir)
  # Process <%= partial "includes/_filename" %> directives
  content.gsub(/<%=\s*partial\s+"includes\/_([^"]+)"\s*%>/) do
    include_file = "#{source_dir}/includes/_#{$1}.md"
    if File.exist?(include_file)
      File.read(include_file)
    else
      "\n<!-- Include file not found: #{include_file} -->\n"
    end
  end
end

def main
  source_dir = File.join(__dir__, 'source')
  index_file = File.join(source_dir, 'index.html.md.erb')
  output_file = File.join(__dir__, 'build', 'delta-exchange-api-docs.md')

  puts "Generating combined markdown documentation..."
  puts "Source: #{index_file}"
  puts "Output: #{output_file}"

  unless File.exist?(index_file)
    puts "Error: Index file not found at #{index_file}"
    exit 1
  end

  # Read the main index file
  index_content = File.read(index_file)

  # Extract metadata from YAML frontmatter
  metadata = read_yaml_frontmatter(index_content)

  # Remove YAML frontmatter
  content = strip_yaml_frontmatter(index_content)

  # Process ERB includes to embed all partial markdown files
  content = process_erb_includes(content, source_dir)

  # Create header with metadata
  header = <<~HEADER
    # Delta Exchange API Documentation

    **Generated:** #{Time.now.strftime('%Y-%m-%d %H:%M:%S UTC')}

    This is a combined markdown file containing all Delta Exchange API documentation.
    It includes REST API, WebSocket API, authentication, error codes, and more.

    **Languages Supported:** #{metadata['language_tabs']&.map { |lang| lang.is_a?(Hash) ? lang.values.first : lang.capitalize }&.join(', ') || 'Python, Ruby, Shell'}

    **Base URL:** `https://api.india.delta.exchange`

    ---

  HEADER

  # Combine header and content
  combined_content = header + content

  # Ensure build directory exists
  build_dir = File.dirname(output_file)
  Dir.mkdir(build_dir) unless Dir.exist?(build_dir)

  # Write the combined markdown file
  File.write(output_file, combined_content)

  file_size = File.size(output_file)
  puts "Successfully generated combined markdown!"
  puts "File size: #{(file_size / 1024.0).round(2)} KB"
  puts "Location: #{output_file}"
end

main if __FILE__ == $PROGRAM_NAME
