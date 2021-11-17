# CALCULATE CALORIE INTAKE

To acquire the knowledge in order to calculate the daily intake of a person we need some data which must be provided by the application user.
Here I will choose and analyze between the methods I need to evaluate that data.

## BASAL METABOLIC RATE

### Equations

|           | **Mifflin-St Jeor**  (used)                                  | **Harris-Benedict**                                          | **Katch-McArdle**                                |
| --------- | ------------------------------------------------------------ | :----------------------------------------------------------- | ------------------------------------------------ |
| **Man**   | (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5 | 10 ⨉ weight (kg) + 6.25 ⨉ height (cm) – 5 ⨉ age (years) + 5  | 0.407 * Weight [Kg] + 0.267 * Height [Cm] - 19.2 |
| **Woman** | (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161 | 10 ⨉ weight (kg) + 6.25 ⨉ height (cm) – 5 ⨉ age (years) – 161 | 0.252 * Weight [Kg] + 0.473 * Height [Cm] - 48.3 |

## ACTIVITY FACTOR

Multiplying the **BMR**, depending on the daily activity.

| Sedentary | Slightly Active(1-3) | Moderately active(3-5) | Active(6-7) | Very Active(Twice a day) |
| --------- | -------------------- | ---------------------- | ----------- | ------------------------ |
| x 1.2     | x 1.375              | x 1.55                 | x 1.725     | x 1.9                    |

## BODY TYPE

Depending on the body type of the user eaten macros change.

|             | **Ectomorph** | **Mesomorph** | **Endomorph** |
| ----------- | ------------- | ------------- | ------------- |
| **Protein** | 25 %          | 30 %          | 35 %          |
| **Carbs**   | 55 %          | 40 %          | 25 %          |
| **Fat**     | 20 %          | 30 %          | 40 %          |

## MOST IMPORTANT MACROS

- Protein
- Carbohydrate
- Fat
- Sodium : 500 - 2000 mg
- Fiber : 
  - Man : 
    - 18 - 50 &roarr; 38g
    - +51 &roarr; 31g
  - Woman :
    - 18 - 50  &roarr; 25g
    - +51 &roarr; 21g

## CALORIC OBJECTIVE

Depending on the user objective

### Maintain

Calories must be kept as they are

### Deficit

Calories must descend in a 20%

### Superavit

Calories must ascend in a 20%

