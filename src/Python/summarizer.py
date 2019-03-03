import nltk
from nltk.corpus import stopwords

stop_words = set(stopwords.words("english"))
import sys

descriptionText = sys.argv[1]


def summarize(text):
    sent_text = nltk.sent_tokenize(text)
    all_words = []
    filtered_sents = []
    for sentence in sent_text:
        word_tokens = nltk.word_tokenize(sentence)
        filtered_sentence = []
        for w in word_tokens:
            if w not in stop_words:
                filtered_sentence.append(w)
        all_words.extend(filtered_sentence)
        filtered_sents.append(filtered_sentence)
    summary = []
    k = 0
    for s in filtered_sents:
        sum = 0
        for word in s:
            sum += all_words.count(word)
        summary.append((sum, k))
        k = k + 1
    new_summary = sorted(summary, reverse=True)
    final_summ = []
    for i in range(4):
        a, b = new_summary[i]
        final_summ.append(" ".join(filtered_sents[b]))
    return ". ".join(final_summ)


print(summarize(descriptionText))
