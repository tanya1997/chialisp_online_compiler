# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
from clvm_tools.cmds import run
import os

def print_hi(name):
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press Ctrl+F8 to toggle the breakpoint.
    path = 'chialisp_compiler/zCfaIjrolXcHpQJ/main.clvm'
    '''os.chdir(path)'''
    run(['run', '-i.', "chialisp_compiler/APWzMGEaddHgDnL/main.clvm"])


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print_hi('PyCharm')

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
