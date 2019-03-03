import nltk
from nltk.corpus import stopwords
import sys
import json

input_word = sys.argv[1]
all_problems = sys.argv[2]
all_problems = json.loads(all_problems)


def search(input_search, all_problems):
    result = []
    stop_words = set(stopwords.words("english"))
    words = nltk.word_tokenize(input_search)
    for word in words:
        word = word.lower()
    words = [w for w in words if w not in stop_words]

    new_problems = []
    for problem in all_problems:
        new_problem = ""
        problem = problem.get("description")
        for word in nltk.word_tokenize(problem):
            new_problem += " " + word.lower()
        new_problems.append(new_problem)

    for i in range(len(new_problems)):
        problem_words = nltk.word_tokenize(new_problems[i])

        #        problem_words = [w for w in problem_words if w not in stop_words]
        num_matches = find_num_matches(words, problem_words)

        if num_matches != 0:
            if len(result) == 0:
                result = [all_problems[i]]
            else:
                j = 0
                while num_matches < find_num_matches(
                    words, nltk.word_tokenize(all_problems[j].get("description"))
                ):
                    j += 1
                result = result[:j] + [all_problems[i]] + result[j:]

    return result


def find_num_matches(words, problem_words):
    return len([word for word in words if word in problem_words])


print(search(input_word, all_problems))

