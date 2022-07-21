def suggest_recipe(pantry: list[str], ingredients: dict[str, list[str]]) -> list[str]:
    """takes in user pantry and a ingredient lookup table, and returns suggested recipes based on how many pantry items the recipes use 

    Args:
        pantry (list[str]): names of the pantry items
        ingredients (dict[str, list[str]]): lookup table, dict[ingredient_name, list[recipes_that_use_ingredient]]

    Returns:
        list[str]: empty if no recipes can be followed, otherwise a list of recipes that use up the most pantry ingredients
    """

    can_be_made = {}
    suggested = []
    most_ingredients_used = 0

    for item in pantry:
        for recipe in ingredients[item]:
            can_be_made[recipe] += 1

    for recipe in can_be_made:
        if (can_be_made[recipe] > most_ingredients_used):
            most_ingredients_used = can_be_made[recipe]
            suggested = [recipe]
        elif(can_be_made == most_ingredients_used):
            suggested.append(recipe)

    return suggested
