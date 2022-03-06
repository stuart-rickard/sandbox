# Password Validity Regex Tutorial

Let's say the security policy for your website requires users to provide a password. Let's say the password must be at least 6 but not more than 12 characters long. Let's say the allowed characters in a password are lowercase and uppercase letters, numbers, and these special characters: !, @, #, $, and %. Is there a simple way to check whether a user-entered string complies with this policy? Yes - there is; read on to find out how!

## Summary

We can write a regular expression or "regex" to check whether a string entered by a user complies with this policy. Here is this regex:

`/^[a-zA-Z0-9!@#$%]{6,12}$/`

This tutorial explains the elements of this regex and how they are used to validate whether the user's entry complies with the policy.

This tutorial also discusses the limitations of regular expressions. For example, let's say the security policy is updated to require that the user includes at least one number and at least one of the special characters -- writing a test to check whether a string meets this updated policy is quite easy in JavaScript, but quite difficult (though possible) using a regex alone.

## Table of Contents

- [Forward Slash Boundaries](#forward-slash-boundaries)
- [Anchors](#anchors)
- [Character Classes](#character-classes)
- [Quantifiers](#quantifiers)
- [Limitations](#limitations)

## Regex Components

For ease of review, our regex is repeated in each section below.

### Forward Slash Boundaries

Observe that the first and last characters of the regex are the same. The forward slash, /, designates the start and end boundaries of the regex. Every regex needs these.

`/^[a-zA-Z0-9!@#$%]{6,12}$/`

### Anchors

The second character is a caret, ^, and the second-to-last character is a dollar sign, $. These anchor characters indicate that the entire string must be considered in the regular expression. We don't want to test just a part of the password that the user entered, we need to look at the string as a whole.

`/^[a-zA-Z0-9!@#$%]{6,12}$/`

### Character Class

The third character in the regex is an open bracket, [. It is matched by a close bracket, ], in the 18th position of the regex. These two symbols work together to define a "character class" (also known as a "character set"). The character class includes the symbols between the brackets.

Between the brackets are the allowed characters in our password policy. The lowercase letters are included by creating a range using a hyphen, a-z. We also have ranges for the uppercase letters, A-Z, and the numbers, 0-9. Lastly, the special characters are included individually.

We are using this character class to ensure that only the allowed characters are in the password. If the string includes any character that is not in the character class, it isn't allowed by our policy, and it will not be a match to our regex.

`/^[a-zA-Z0-9!@#$%]{6,12}$/`

### Quantifiers

After the character class definition is a quantifier. The pair of curly braces with two numbers inside define how many times we need to see the character class. Our regex requires that the string must include the character class in the first 6 positions of the string. If there are more characters in the string, we are checking those positions up to position 12. If any of those aren't in the character class, the regex doesn't match. After the 12th character, the regex requires the string to end, so if there are 13 or more characters, the string does not match.

`/^[a-zA-Z0-9!@#$%]{6,12}$/`

### Limitations

Our regex does not use all of the capabilities of regular expresions. For example, we can use regular expressions to replace matched strings in a document. We can do more sophisticated matches, too -- for example, by allowing alternative matches (similar to an "or" operator).

But let's consider the example noted in the summary: our secuity policy is changed to require at least one number and one special character in the string. There is a way to do this using regular expressions, but the regex would be massive -- we would need to create a regex for each possible location of the number and special character and then allow each of these regexes to be an allowed alternative match. The total number of regexes to be linked this way would be 131 (12 x 11). If the policy additionally required at least one uppercase letter the number of regexes would be 1310.

Thankfully, if we are validating passwords on a website, we can pair the strength of regular expressions for matching with the nimbleness of Javascript. In our first step, we can use our regex to determine whether the string includes only allowed characters and whether it is the correct length. In the second step, we can use JavaScript to confirm whether the string includes al required characters.

## Author

Stuart Rickard is a student in the UC Berkeley Extension Full Stack Web Development Bootcamp. His GitHub profile is [here](https://github.com/stuart-rickard).
