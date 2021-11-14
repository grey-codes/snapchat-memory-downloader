# snapchat-memory-downloader

## Starting Guide

1. [Export your data from Snapchat's settings](https://support.snapchat.com/en-US/a/download-my-data)
2. Copy the `memories_history.html` file into the project directory.
3. Run `npm install`
4. Run `node download_memories.js`

Your memories will be output into the output subfolder of the project directory.

## Project Design
### Background

I've always had mixed feelings on social media -- especially on our phones.

On one hand, I think that it's an incredibly valuable way to stay connected with friends, family, and acquaintances.
Social media helps us stay updated on the little things that we wouldn't go out and call someone about.

On the other hand, I feel that it can be a drain on both us and our devices;
these apps encourages us to compulsively check our phones and distract from genuine human connection.

This weekend, I felt it was time to finally move away from Snapchat.
However, this proved to be harder than it would seem.

### The Problem

Snapchat makes it easy, in theory, to keep your memories when you leave.
They present two options for exporting, each with their own issue:

- You can very easily export memories from the app. However...
  - Exporting is slow with one memory, and even slower with more.
  - Exporting is capped at 100 memories per action.
  - Exporting erases the date time.
- You can also export your data as a package from the app settings. But...
  - Memories must be downloaded individually.
  - Memories' links won't work with a batch-downloader, as they use Snap's authentication using a SAS token (or S3 equivalent)
  - Memories are again missing dates.

Note: You could use a custom script to address bulk downloads, but Chrome prevents you from downloading multiple files easily from the file:// url

### The Solution

Exporting gives us the data we need -- just stuck behind a layer of obscurity.

Instead of loading the web page in the browser, we can parse the nodes into groups of date and href.
Then, we can convert the href into a valid url by stripping the JavaScript call out of it.
After that, we can authenticate with Snapchat's token generator the same way as their original code.
Last, we can save that data as a file with valid metadata.

This bypasses browser "security" for multi-file downloads and is extremely fast, as downloads may be made parallel.
