//= require ../lib/_jquery
;(function () {
  'use strict';

  // Initialize download functionality when DOM is ready
  $(document).ready(function() {

    // PDF Download Handler
    $('#download-pdf').click(function(e) {
      e.preventDefault();
      window.print();
      return false;
    });

    // Markdown Download Handler
    $('#download-markdown').click(function(e) {
      e.preventDefault();

      // Check if pre-generated markdown file exists
      var markdownUrl = 'delta-exchange-api-docs.md';

      // Try to download the pre-generated file
      fetch(markdownUrl)
        .then(function(response) {
          if (response.ok) {
            return response.blob();
          } else {
            // If pre-generated file doesn't exist, generate from content
            return generateMarkdownFromContent();
          }
        })
        .then(function(blob) {
          downloadBlob(blob, 'delta-exchange-api-docs.md', 'text/markdown');
        })
        .catch(function(error) {
          console.error('Error downloading markdown:', error);
          // Fallback to generating from content
          var blob = generateMarkdownFromContent();
          downloadBlob(blob, 'delta-exchange-api-docs.md', 'text/markdown');
        });

      return false;
    });
  });

  /**
   * Generate markdown content from the page's DOM content
   * This is a fallback if the pre-generated file is not available
   */
  function generateMarkdownFromContent() {
    var content = '';

    // Add header
    content += '# Delta Exchange API Documentation\n\n';
    content += '**Generated:** ' + new Date().toUTCString() + '\n\n';
    content += 'This is a combined markdown file containing all Delta Exchange API documentation.\n';
    content += 'It includes REST API, WebSocket API, authentication, error codes, and more.\n\n';
    content += '**Base URL:** `https://api.india.delta.exchange`\n\n';
    content += '---\n\n';

    // Extract text content from the main documentation area
    // We'll get the content div and convert it to markdown-like format
    var $content = $('.content').clone();

    // Remove code examples (they're in the dark area)
    $content.find('pre').each(function() {
      var $pre = $(this);
      var code = $pre.find('code').text();
      var lang = '';

      // Try to detect language from class
      var classes = $pre.find('code').attr('class') || '';
      var langMatch = classes.match(/language-(\w+)/);
      if (langMatch) {
        lang = langMatch[1];
      }

      $pre.replaceWith('\n```' + lang + '\n' + code + '\n```\n');
    });

    // Convert headings
    $content.find('h1').each(function() {
      $(this).replaceWith('\n# ' + $(this).text() + '\n\n');
    });

    $content.find('h2').each(function() {
      $(this).replaceWith('\n## ' + $(this).text() + '\n\n');
    });

    $content.find('h3').each(function() {
      $(this).replaceWith('\n### ' + $(this).text() + '\n\n');
    });

    $content.find('h4').each(function() {
      $(this).replaceWith('\n#### ' + $(this).text() + '\n\n');
    });

    // Convert links
    $content.find('a').each(function() {
      var $link = $(this);
      var text = $link.text();
      var href = $link.attr('href') || '';
      $link.replaceWith('[' + text + '](' + href + ')');
    });

    // Convert code inline
    $content.find('code').each(function() {
      $(this).replaceWith('`' + $(this).text() + '`');
    });

    // Convert strong/bold
    $content.find('strong, b').each(function() {
      $(this).replaceWith('**' + $(this).text() + '**');
    });

    // Convert em/italic
    $content.find('em, i').each(function() {
      $(this).replaceWith('*' + $(this).text() + '*');
    });

    // Convert lists
    $content.find('ul').each(function() {
      var $ul = $(this);
      var listText = '\n';
      $ul.find('> li').each(function() {
        listText += '- ' + $(this).text() + '\n';
      });
      $ul.replaceWith(listText + '\n');
    });

    $content.find('ol').each(function() {
      var $ol = $(this);
      var listText = '\n';
      var index = 1;
      $ol.find('> li').each(function() {
        listText += index + '. ' + $(this).text() + '\n';
        index++;
      });
      $ol.replaceWith(listText + '\n');
    });

    // Convert tables (basic support)
    $content.find('table').each(function() {
      var $table = $(this);
      var tableText = '\n';

      // Headers
      var headers = [];
      $table.find('thead th').each(function() {
        headers.push($(this).text());
      });

      if (headers.length > 0) {
        tableText += '| ' + headers.join(' | ') + ' |\n';
        tableText += '| ' + headers.map(function() { return '---'; }).join(' | ') + ' |\n';
      }

      // Rows
      $table.find('tbody tr').each(function() {
        var cells = [];
        $(this).find('td').each(function() {
          cells.push($(this).text());
        });
        if (cells.length > 0) {
          tableText += '| ' + cells.join(' | ') + ' |\n';
        }
      });

      $table.replaceWith(tableText + '\n');
    });

    // Get final text content
    content += $content.text();

    // Clean up multiple newlines
    content = content.replace(/\n{3,}/g, '\n\n');

    return new Blob([content], { type: 'text/markdown' });
  }

  /**
   * Download a blob as a file
   */
  function downloadBlob(blob, filename, mimeType) {
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

})();
