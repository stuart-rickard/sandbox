example = '["one", "two", "three"]'
# example = '["one"]'
# example = 75
# example = '"["one","two","three"]"'

# quotation = '\"'
# open_bracket = '['
# closed_bracket = ']'

# def remove_start_and_end_quotes(string):
#   if string[0] == quotation and string[-1] == quotation:
#     print("both are quotes")
#     new_string = string[1:-1]
#     print(new_string)
#     return new_string
#   else:
#     print("not both")
#     return False  

# def remove_start_and_end_brackets(string):
#   if string[0] == open_bracket and string[-1] == closed_bracket:
#     print("both are brackets")
#     new_string = string[1:-1]
#     print(new_string)
#     return new_string
#   else:
#     print("not both")
#     return False  

def parse_arrayish_string(string):
  working_array = []
  strings = string.split(",")
  for str in strings:
    trimmed_str = str.strip(' \"\'')
    working_array.append(trimmed_str)
  return working_array

brackets_removed = example.strip('[]')
print(parse_arrayish_string(brackets_removed))

