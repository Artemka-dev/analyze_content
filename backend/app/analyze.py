from app.settings import settings
from fuzzywuzzy import fuzz

import codecs
import os


def search_strings(path):
    """Функция для поиска всех строк в бинарном файле"""

    strings = ''

    with open(path, 'rb') as file:

        for line in file.readlines():
            try:
                line = codecs.decode(line.decode('utf-8'), 'unicode_escape').encode('latin-1')
                decoded_content = line.decode('utf-8', errors='ignore')
                strings += decoded_content.strip()
            except (AttributeError, UnicodeDecodeError):
                continue

    return strings

def analyze_strings(strings):
    """Функция для анализа строк на поиск политического контента"""

    max_ratio = 80
    potentian_strings = []

    with open('./content/dictionary.txt', 'r', encoding='utf-8') as file:
        words = file.readlines()

        for word in words:

            for i in range(len(strings) - len(word) + 2):
                substring = strings[i:i + len(word)]
                ratio = fuzz.WRatio(substring, word)

                if ratio > max_ratio:
                    potentian_strings.append({'word': word.strip(), 'ratio': ratio})

    return potentian_strings
