

# Documentation updates regarding SDKs

When making updates to documentation about an SDK, you should generally see if similar documentation exists for another SDK, so you can generally follow the patterns in that documentation. Note: this does not mean that if you don't see documenation for that feature for another SDK, you should avoid creating it for this one. 
# Scope control: Be surgical with edits

When making documentation updates, be very focused and minimal in your changes. If the trigger event is about a simple value change (e.g., a configuration default changing from 5 to 10, a version number update, a parameter name change), limit your edits to only what's necessary to reflect that specific change.

**Don't:**
- Rewrite surrounding prose when it's not necessary
- Make stylistic improvements to adjacent content
- Add explanatory text that wasn't part of the original request
- Restructure sections just because you're already editing nearby

**Do:**
- Make the specific change requested (e.g., update the value in a code example)
- Fix any directly related references to that value in the immediate context
- Ensure technical accuracy of the specific change

Example: If a dynamic config default changes from 5 to 10, update the number in the command example and any direct references to that threshold - but don't rewrite the explanation about what the feature does unless it's technically incorrect. 