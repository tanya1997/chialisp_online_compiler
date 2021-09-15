import io
import os
import random
import shutil
import sys
from contextlib import redirect_stdout
from io import StringIO

from bitstring import xrange
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from click._termui_impl import open_url
from clvm_tools.cmds import brun, run
from random import choice
import string
from django.shortcuts import render, redirect
from .forms import TaskForm
import json
# Create your views here.

def about(request):
    return render(request, 'main/about.html')

def create(request):
    error = ''
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            code = form.data.get('code')
            print(code)
            output = 'test'
            with io.StringIO() as buf, redirect_stdout(buf):
                run(['i', code])
                output = buf.getvalue()
                arr = []
                arr.append('i')
                output = output.strip()
                arr.append(output)
                arr.append('(5)')
                brun(arr)
                output = buf.getvalue()
            ''''''
            print(output)
            '''form.save()'''
            print(form)
            error = output
        else:
            print(form)
            error = 'Форма была неверной'

    form = TaskForm()
    context = {
        'form': form,
        'error': error
    }
    return render(request, 'main/create.html', context)

@api_view(['POST'])
def run_command(request):
    if request.method == 'POST':
        print('POST_test')
        print(request.POST)
        path = "".join([random.choice(string.ascii_letters) for i in xrange(15)])
        print(path)
        if (os.path.isdir(path)):
          shutil.rmtree(path)
        os.mkdir(path)
        os.chdir(path)
        for key in request.POST:
            value = request.POST[key]
            f = open(key, 'w')  # open file in append mode
            f.write(value)
            f.close()
            print(key)
            print(value)
        output = 'test'
        with io.StringIO() as buf, redirect_stdout(buf):
            '''file1 = open(path+'/main.clvm', "r+")'''
            run(['run', '-i.', "main.clvm"])
            output = buf.getvalue()
            output = output.strip()
        print(output)
        os.chdir("..")
        shutil.rmtree(path)
        return Response(output)
    else:
        return Response(200)

@api_view(['POST'])
def brun_command(request):
    if request.method == 'POST':
        print('POST_test')
        print(request.POST)
        output = 'test' ''' with io.StringIO() as buf, redirect_stdout(buf):'''
        with io.StringIO() as buf, redirect_stdout(buf):
            for key in request.POST:
                value = request.POST[key]

                arr = value.split('\' \'')
                for i, val in enumerate(arr):
                    arr[i] = val.replace('\'', '')
                arr.insert(0, 'i')
                brun(arr)
                output = buf.getvalue()
                output = output.strip()
        return Response(output)
    else:
        return Response(200)