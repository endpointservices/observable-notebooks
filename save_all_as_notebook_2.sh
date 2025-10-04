#!/bin/bash
# This script iterates through all notebook directories and downloads the notebook 2.0 source.

# Find all directories that look like @author/notebook and iterate them
find @* -mindepth 1 -maxdepth 1 -type d | while read -r notebook_dir; do
  # The notebook identifier is the directory path itself, e.g. @tomlarkworthy/micro-kernel-design
  echo "Downloading $notebook_dir to $notebook_dir/notebook.html"
  ./download_notebook_2.sh "$notebook_dir" > "$notebook_dir/notebook.html"
done

echo "All notebooks have been downloaded."
