# deviceSimulator.py
import random

def generate_vital_signs():
    # Randomly select from low, normal, or high ranges
    heart_rate = random.choice([
        random.randint(40, 59),    # Low
        random.randint(60, 100),   # Normal
        random.randint(101, 180)   # High
    ])

    blood_pressure = random.choice([
        f"{random.randint(80, 109)}/{random.randint(50, 69)}",    # Low
        f"{random.randint(110, 140)}/{random.randint(70, 90)}",   # Normal
        f"{random.randint(141, 200)}/{random.randint(91, 130)}"   # High
    ])

    temperature = random.choice([
        round(random.uniform(95.0, 97.4), 1),   # Low
        round(random.uniform(97.5, 99.5), 1),   # Normal
        round(random.uniform(99.6, 105.0), 1)   # High
    ])

    return {
        'heart_rate': heart_rate,
        'blood_pressure': blood_pressure,
        'temperature': temperature
    }
