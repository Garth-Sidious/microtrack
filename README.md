# Microtrack
Work in progress application for MicroTrack.

## Development Instructions

1. Clone this repository with git (git clone https://github.com/Garth-Sidious/microtrack.git) (you may have to download git first)
2. Open chrome, go to chrome://extensions/, enable dev mode
3. Click 'Load Unpacked' and open the new microtrack folder from git
4. Navigate to New World, add some items to the cart, open the cart sidebar, and open the extension

## Limitations

- Only works with Chrome
- Only works with New World
- Only works when cart sidebar is open (not on full cart page)
- Must be opened by the user (this is an extension issue disallowed for security reasons that will be hard to solve)
- Looks awful
- Doesn't actually do anything useful

## Architecture Notes

The popup folder is the most important. This contains the actual popup. The part of popup.js with access to the 'trolley' variable is where the most interesting stuff should happen.
*In general, popup.js should get everything it needs to display information from other files (such as the cart contents), and should only focus on displaying that information*

Scripts contains other scripts, currently just background.js. (background.js needs to be seperate from popup.js as popup.js only has access to the popup DOM, but background.js has access to the page DOM)

The images folder contains icons for display - these will need to be replaced much later but are useful to have for testing.

manifest.json contains setup options for the extension.