import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
        en: {
            translation: {
              description: {
                tab_food: 'Food',
                tab_health: 'Health',
                tab_environment: 'Environment',
                icon_diary: 'My Food Diary',
                icon_save: 'Plan to Save',
                my_plan_to_save: 'My Plan To Save',
                meal_diary: 'MEAL DIARY',
                recipe: 'RECIPE',
                shopping_list: 'SHOPPING LIST',
                inventory: 'INVENTORY',
                meal_planner: 'MEAL PLANNER',
                view_plan: 'VIEW PLAN',
                add_meal_diary: 'Add casual meals to your calendar or edit added meals',
                my_saved_meals: 'My Saved Meals',
                search_recipes: 'Search Recipes',
                enter_meal_name: 'Enter Meal Name',
                button_search: 'Search',
                meal_type: 'Meal Type:',
                origin: 'Origin:',
                any: 'Any',
                requirements: 'Requirements:',
                add_other_items: 'Ajoutez dautres articles à votre liste de courses',
                order_all_food_text: 'Order all food items by clicking the "All" button or select items by checking the boxes. You can edit food items before placing an order.',
                no_items_shop: 'There are no items in the list yet :( please refresh page'
              }
            }
          },
        fr: {
        translation: {
            description: {
                tab_food: 'nourriture',
                tab_health: 'santé',
                tab_environment: 'environnement',
                icon_diary: 'Mon Journal Alimentaire',
                icon_save: 'Prévoir déconomiser',
                my_plan_to_save: 'Mon Plan Pour Sauver',
                meal_diary: 'JOURNAL DES REPAS',
                recipe: 'RECETTE',
                shopping_list: 'LISTE DE COURSES',
                inventory: 'INVENTAIRE',
                meal_planner: 'PLANIFICATEUR DE REPAS',
                view_plan: 'VOIR LE PLAN',
                add_meal_diary: 'Ajoutez des repas décontractés à votre calendrier ou modifiez les repas ajoutés',
                my_saved_meals: 'Mes Repas Enregistrés',
                search_recipes: 'Rechercher Des Recettes',
                enter_meal_name: 'Entrez le nom du repas',
                button_search: 'Recherche',
                meal_type: 'Type de repas:',
                origin: 'Origine:',
                any: 'Nimporte quel',
                requirements: 'Exigences:',
                add_other_items: 'Ajoutez dautres articles à votre liste de courses',
                order_all_food_text: 'Commandez tous les aliments en cliquant sur le bouton «Tous» ou sélectionnez des articles en cochant les cases. Vous pouvez modifier les produits alimentaires avant de passer une commande.',
                no_items_shop: 'Il ny a pas encore darticles dans la liste :( veuillez actualiser la page'
            }
        }
        }
    }
  });

export default i18n;