function group_rows_by_background($content) {
    // Load the DOMDocument class
    $dom = new DOMDocument();
    
    // Suppress warnings due to HTML5 tags and load the HTML content
    @$dom->loadHTML($content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    
    // Create a new XPath object to query the DOM
    $xpath = new DOMXPath($dom);
    
    // Select all rows inside .main-content > .row > *
    $rows = $xpath->query("//div[contains(@class, 'main-content')]/div[contains(@class, 'row')]/div");

    $prev_background = null;
    $current_group = [];
    $log_data = [];

    // Loop through each row
    foreach ($rows as $index => $row) {
        // Find the first .row-bg-wrap within the row
        $row_bg_wrap = $xpath->query(".//div[contains(@class, 'row-bg-wrap')]", $row)->item(0);

        // Find the .row-bg element within .row-bg-wrap
        $row_bg = $xpath->query(".//div[contains(@class, 'row-bg')]", $row_bg_wrap)->item(0);
        
        $background = false;
        
        if ($row_bg) {
            $outer_html = $dom->saveHTML($row_bg);

            // Extract the background-image URL
            if (preg_match('/background-image:\s*url\((https?:\/\/[^\)]+)\)/', $outer_html, $matches)) {
                $background = $matches[1];
            }

            // Extract the background-color
            if (preg_match('/background-color:\s*([^\;]+);/', $outer_html, $matches)) {
                $background = $matches[1];
            }

            // If neither, it remains false
        }

        // Check if the current background matches the previous one
        if ($background === $prev_background) {
            // Add to the current group
            $current_group[] = $row;
        } else {
            // Process the previous group
            if (!empty($current_group)) {
                apply_group_classes($current_group);
            }

            // Start a new group
            $current_group = [$row];
            $prev_background = $background;
        }
    }

    // Process the final group
    if (!empty($current_group)) {
        apply_group_classes($current_group);
    }

    // Save and return the modified HTML
    return $dom->saveHTML();
}

function apply_group_classes($group) {
    $group_size = count($group);

    if ($group_size > 0) {
        // Apply .row__bg-change-start to the first row in the group
        $first_row = $group[0];
        $current_class = $first_row->getAttribute('class');
        $first_row->setAttribute('class', $current_class . ' row__bg-change-start');

        // Apply .row__bg-change-end to the last row in the group
        $last_row = $group[$group_size - 1];
        $current_class = $last_row->getAttribute('class');
        $last_row->setAttribute('class', $current_class . ' row__bg-change-end');
    }
}

function start_output_buffering_for_grouping() {
    ob_start('group_rows_by_background');
}

function end_output_buffering_for_grouping() {
    if (ob_get_length()) ob_end_flush();
}

// Hook the output buffering functions into WordPress
add_action('wp_head', 'start_output_buffering_for_grouping');
add_action('wp_footer', 'end_output_buffering_for_grouping');
