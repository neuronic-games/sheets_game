import gspread
import sys
import json


# Credentials [Keys etc]
credFileName = "credentials.json"
mServiceAccount = gspread.service_account(filename=credFileName)
mGoogleSheetId = sys.argv[1].split('sheetname')[0]

#Open the sheet based on sheet id passed
mGoogleSheet = mServiceAccount.open_by_key(mGoogleSheetId)

#checking if variable is None
if sys.argv[1].split('sheetname')[1].split('gamesData')[0] == "null":                   
    sheetName = mGoogleSheet.worksheets()[0].title
else :
    sheetName = sys.argv[1].split('sheetname')[1].split('gamesData')[0]

# Getting the date from the mentioned sheet name
mSelectedWorkSheet = mGoogleSheet.worksheet(sheetName)


# Read saved game list json
with open('gamesList.json', 'r', encoding='utf8') as f:
     data = f.read()

# Filter game records
game_string_encode = data.encode("ascii", "ignore")
game_string_decode = game_string_encode.decode()
game_string = game_string_decode.replace("{{", "").replace("}}", "").replace("{", "[").replace("}", "]").replace('"', "")
final_game_string = game_string.replace('[[', "").replace(']]', "")
game_list_string = final_game_string.split("],[")

# Format game list insertable format
game_list = []
for i in game_list_string:
    game_value = i.split(",")
    game_list.append(game_value)

# Inserting bulk records
mSelectedWorkSheet.append_rows(game_list)

# Print back
print('Games List Saved.')

