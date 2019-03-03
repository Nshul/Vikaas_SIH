import csv
import geopy as gp 
import matplotlib.pyplot as plt
import copy
import os
import math
import nltk
import pandas as pd
import numpy as np
import random
import sys
from sklearn.cluster import KMeans
import gmplot
from random import randint
import geopy.geocoders
from geopy import distance
Budget=800
POP_SIZE=50
CROSSOVER_RATE=0.7
MUTATION_RATE =0.01
Number_of_gens=200
num_of_problems=sys.argv[1]
similarity_scores=np.zeros(10)
'''
upvotes=[60,50,40,30,20,10,80,70,45,65]
problems=["hello world","whats up world","yo yo world","this is a good world","lol world","my world","lol my life","hello my world life","good life","this life world is my"]
funds=[100,140,30,400,250,125,170,80,180,95]
duration=[10,28,5,7,3,15,21,45,37,20,18]
points = np.array([(33.7434, 41.4566),
       (33.9693, 41.3923),
       (33.6074, 41.277 ),
       (34.4823, 41.919 ),
       (34.3702, 41.1424),
       (34.3931, 41.078 ),
       (34.2377, 41.0576),
       (34.2395, 41.0211),
       (34.4443, 41.3499),
       (34.3812, 40.9793)])
'''
problems=sys.argv[2]
upvotes=sys.argv[3]
funds=sys.argv[4]
durations=sys.argv[5]
aoa_pts=sys.argv[6]
points= [ (a,b) for [a,b] in aoa_pts ]


def check_clusters_if_valid(clusters_label,points):
    for i in range(len(points)):
        for j in range(i+1,len(points)):
            if(clusters_label[i]==clusters_label[j]):
                if(gp.distance.vincenty( points[i],points[j]).miles>20):
                    return False
    return True

def k_clustering(number_of_clusters,points):
    kmeans = KMeans(n_clusters=number_of_clusters, random_state=0).fit(points)
    return kmeans.labels_
def assign_cluster_labels(points):
    k=2
    cluster_labels=[]
    while(True):
        cluster_labels=k_clustering(k,points)
        if(check_clusters_if_valid(cluster_labels,points)):
            break
        k=k+1
    return cluster_labels

def similarity(prob1,prob2):
    prob1=nltk.word_tokenize(prob1)
    prob2=nltk.word_tokenize(prob2)
    return len([word for word in prob1 and word in prob2])
    
def assign_similarity_score(points):
    labels=assign_cluster_labels(points)
    for i in range(num_of_problems):
        for j in range(i+1,len(points)):
            if(labels[i]==labels[j]):
                similarity_scores[i]+=similarity(problems[i],problems[j])

def generateChromosome():
    chromo= np.zeros(num_of_problems)
        
    for i in range(num_of_problems):
        if(random.random()<0.5):
            chromo[i]=0
        else:
            chromo[i]=1
                
    return chromo
# Generating initial population
def initialpop() :

        i = 0
        pop = []
        while (i !=POP_SIZE) :
                chromosome = generateChromosome()
                while(True):
                        if(fitness_chromosome(chromosome)!=0):
                            break
                        chromosome = generateChromosome()
                i = i + 1
                pop.append(chromosome)
        return pop

def fitness_chromosome(chromosome):
    fitness=0
    cost=0
    for i in range(num_of_problems):
        if(chromosome[i]!=0):
            fitness= fitness+ (10*similarity_scores[i]+upvotes[i])/duration[i]
            cost+= funds[i]

    if(cost>Budget):
        return 0
    return fitness

def fitness_pop(pop) :
        pop_fitness_list = []
        for i in range(0, POP_SIZE) :
                pop_fitness_list.append(fitness_chromosome(pop[i]))
        return pop_fitness_list

def avg_fitness_pop(pop):
        fitness=0
        for i in range(0, POP_SIZE) :
                fitness += fitness_chromosome(pop[i])
        return fitness/POP_SIZE
def best_chromosome(pop):
        maxFitness=0
        for i in range(POP_SIZE):
                temp_fitness= fitness_chromosome(pop[i])
                if temp_fitness>maxFitness:
                        best=pop[i]
                        maxFitness=temp_fitness
        return best


def probability_calc(pop):
    fitness = fitness_pop(pop)
    total_fit=float(sum(fitness))
    relative_fitness = [f/total_fit for f in fitness]
    probabilities = [sum(relative_fitness[:i+1]) for i in range(len(relative_fitness))]
    return probabilities

def roulette_wheel_pop(pop, probabilities):
        r = random.random()
        for (i, individual) in enumerate(pop):
                if (r < probabilities[i]):
                        return np.array(individual)



def mutate(chromo):
        for i in range(num_of_problems):
                r=random.random()
                if(r<MUTATION_RATE):
                        chromo[i]=1-chromo[i]


def crossover(chromo1,chromo2):
        crossover_point=random.randint(0,num_of_problems)
        new_chromo1= copy.deepcopy(chromo1)
        new_chromo2= copy.deepcopy(chromo2)
        if(random.random()<CROSSOVER_RATE):
            for i in range(crossover_point+1,num_of_problems):
                new_chromo1[i]=chromo2[i]
                new_chromo2[i]=chromo1[i]
            
            
            chromo1 = new_chromo1
            chromo2 = new_chromo2

def next_gen(pop,probabilities):
        next_gen=[]
        for i in range(POP_SIZE//2):
                chromo1=roulette_wheel_pop(pop,probabilities)
                chromo2=roulette_wheel_pop(pop,probabilities)
                crossover(chromo1,chromo2)
                mutate(chromo1)
                mutate(chromo2)
                next_gen.append(chromo1)
                next_gen.append(chromo2)
        return next_gen
temp=assign_cluster_labels(points)
current_population= initialpop()
gen_fitness=[]
probability_calc(current_population)
for i in range(Number_of_gens):
        probabilities=probability_calc(current_population)
        gen_fitness.append(avg_fitness_pop(current_population))
        current_population=next_gen(current_population,probabilities)

bcr=best_chromosome(current_population)
print(bcr)


