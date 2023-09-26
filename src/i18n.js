import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

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
		fallbackLng: "en",
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		resources: {
			en: {
				translation: {
					description: {
						tab_food: "Food",
						tab_health: "Health",
						tab_environment: "Environment",
						icon_diary: "My Food Diary",
						icon_save: "Plan to Save",
						my_plan_to_save: "My Plan To Save",
						meal_diary: "MEAL DIARY",
						recipe: "RECIPE",
						shopping_list: "SHOPPING LIST",
						inventory: "INVENTORY",
						meal_planner: "MEAL PLANNER",
						view_plan: "VIEW PLAN",
						add_meal_diary:
							"Add casual meals to your calendar or edit added meals",
						my_saved_meals: "My Saved Meals",
						search_recipes: "Search Recipes",
						enter_meal_name: "Enter Meal Name",
						button_search: "Search",
						meal_type: "Meal Type:",
						origin: "Origin:",
						any: "Any",
						requirements: "Requirements:",
						add_other_items: "Add other items to your Shopping List",
						order_all_food_text:
							'Order all food items by clicking the "All" button or select items by checking the boxes. You can edit food items before placing an order.',
						no_items_shop:
							"There are no items in the list yet :( please refresh page",
						add_new_items: "Add new items to your inventory ",
						please_add_weight:
							"Please, add the weight/volume of each food item using the unit of measurement in the meal plan and and the food item purchased.",
						changes_to_mealplan:
							'Want to make changes to your meal plan? Add more meals to your meal plan by clicking the "plus" button or remove meals from the meal plan by deleting from the meal plan list',
						new_to_mealplan:
							'New to meal planning? Create your 6-Months meal plan by clicking on the "plus" button, using the search button or your saved meals or the barcode scanner, add at least 7 meals each for breakfast, lunch and dinner; then go to the View Plan tab to generate a 6 month meal plan',
						six_month_plan: "6-Months Meal Plan",
						button_all: "All",
						button_view_cart: "View Cart",
						button_yes: "Yes",
						button_no: "No",
						button_confirm: "Confirm",
						button_cancel: "Cancel",
						button_generate: "Generate",
						list_of_items: "List of items to order",
						regenerate_shop_list: "Regenerate Your Shopping List",
						generate_shop_list: "Generate Your Shopping List",
						generate_new_list: "Generate a new list?",
						order_food_items: "Order your food items from your shopping list",
						meal_name: "Meal Name",
						weight_volume: "Weight/Volume",
						add_ingredient: "Add Ingredient",
						button_done: "Done",
						amount: "Amount",
						add_new_meal_for: "Add new meal for",
						eat_home_out: "Are you cooking at home or eating out?",
						add_save_meal: "Add To Saved Meals",
						give_this_plan_name: "Give this plan a name",
						create_six_plan_from: "Create a 6-Months meal plan starting from",
						add_from_saved_meal: "Add from saved meals",
						add: "Add",
						to_calendar: "to Calendar",
						expiry_date: "Expiry Date",
						add_to_inventory: "Add new item to inventory",
						accept_and_process: "Accept and Process this Order?",
						accept_to_deliver: "Accept to Deliver this Order?",
						we_have_not_restaurant:
							"We have not identified a sustainable restaurant in your location, please recommend a restaurant or check back later.",
						restaurant_name: "Restaurant Name",
						location: "location",
						email_address: "Their Email Address",
						eat_now_or_later: "Eat Now or Later",
						eat_now_or_add_recipe: "Eat Now or Add Recipe",
						weight_volume: "Weight/volume - Meal plan",
						edit_item: "Edit Item",
						weight_volume_food: "Weight/Volume - Purchased food item",
						place_of_purchase: "Place of Purchase",
						farmer_list_info: "This farmer does not have this item :(",
						gift_food: "Gift Food",
						gifted_item: "Gifted Item?",
						remove: "Remove",
						from_your_inventory: "from the inventory?",
						cannot_find_measurement:
							"Cannot find the measurement unit? select another unit, measure and update",
						payment: "Payment",
						continue_to_payment: "Continue to payment?",
						prepared_or_raw: "Prepared Or Raw",
						purchase_item: "Purchase Item",
						continue_purchase: "Purchase Item?",
						hello: "Hello",
						do_you_want_to: "Do you want to request for",
						to_be_delivered: "to be delivered to you?",
						order: "Order",
						add_to_food_waste: "Add To Food Waste",
						of: "of",
						order_id: "Order ID:",
						order_status: "Order Status:",
						product: "Product",
						quantity: "Quantity",
						supplier: "Supplier",
						measure: "Measure",
						price: "Price",
						no_notifications: "You dont have any Notifications :(",
						add_meal: "Add Meal",
						button_submit: "Submit",
						ingredient: "Ingredients",
						edit_meal: "Edit Meal",
						delivery_date: "Delivery Date",
						farm: "FARM",
						ref_num: "Ref Num:",
					},
				},
			},
			fr: {
				translation: {
					description: {
						tab_food: "nourriture",
						tab_health: "santé",
						tab_environment: "environnement",
						icon_diary: "Mon Journal Alimentaire",
						icon_save: "Prévoir déconomiser",
						my_plan_to_save: "Mon Plan Pour Sauver",
						meal_diary: "JOURNAL DES REPAS",
						recipe: "RECETTE",
						shopping_list: "LISTE DE COURSES",
						inventory: "INVENTAIRE",
						meal_planner: "PLANIFICATEUR DE REPAS",
						view_plan: "VOIR LE PLAN",
						add_meal_diary:
							"Ajoutez des repas décontractés à votre calendrier ou modifiez les repas ajoutés",
						my_saved_meals: "Mes Repas Enregistrés",
						search_recipes: "Rechercher Des Recettes",
						enter_meal_name: "Entrez le nom du repas",
						button_search: "Recherche",
						meal_type: "Type de repas:",
						origin: "Origine:",
						any: "Nimporte quel",
						requirements: "Exigences:",
						add_other_items:
							"Ajoutez dautres articles à votre liste de courses",
						order_all_food_text:
							"Commandez tous les aliments en cliquant sur le bouton «Tous» ou sélectionnez des articles en cochant les cases. Vous pouvez modifier les produits alimentaires avant de passer une commande.",
						no_items_shop:
							"Il ny a pas encore darticles dans la liste :( veuillez actualiser la page",
						add_new_items: "Ajoutez de nouveaux objets à votre inventaire",
						please_add_weight:
							"Veuillez ajouter le poids/volume de chaque aliment en utilisant lunité de mesure du plan de repas et laliment acheté.",
						changes_to_mealplan:
							'Vous souhaitez apporter des modifications à votre plan de repas ? Ajoutez plus de repas à votre plan de repas en cliquant sur le bouton "plus" ou supprimez des repas du plan de repas en les supprimant de la liste des plans de repas',
						new_to_mealplan:
							'Nouveau dans la planification des repas ? Créez votre plan de repas de 6 mois en cliquant sur le bouton "plus", en utilisant le bouton de recherche ou vos repas enregistrés ou le lecteur de code-barres, ajoutez au moins 7 repas chacun pour le petit-déjeuner, le déjeuner et le dîner ; puis allez dans l"onglet Afficher le plan pour générer un plan de repas de 6 mois',
						six_month_plan: "Plan de repas de 6 mois",
						button_all: "Tout",
						button_view_cart: "Voir le panier",
						button_yes: "Oui",
						button_no: "Non",
						button_confirm: "Confirmer",
						button_cancel: "Annuler",
						button_generate: "Générer",
						list_of_items: "Liste des articles à commander",
						regenerate_shop_list: "Régénérez votre liste de courses",
						generate_shop_list: "Générez votre liste de courses",
						generate_new_list: "Générer une nouvelle liste ?",
						order_food_items:
							"Commandez vos aliments à partir de votre liste de courses",
						meal_name: "Nom du repas",
						weight_volume: "Poids/Volume",
						add_ingredient: "Ajouter un ingrédient",
						button_done: "Fait",
						amount: "Montant",
						add_new_meal_for: "Ajouter un nouveau repas pour",
						eat_home_out: "Cuisinez-vous à la maison ou au restaurant ?",
						add_save_meal: "Ajouter aux repas enregistrés",
						give_this_plan_name: "Give this plan a name",
						create_six_plan_from: "Donnez un nom à ce plan",
						add_from_saved_meal: "Ajouter à partir de repas enregistrés",
						add: "Ajouter",
						to_calendar: "au calendrier",
						expiry_date: 'Date d"expiration',
						add_to_inventory: 'Ajouter un nouvel article à l"inventaire',
						accept_and_process: "Accepter et traiter cette commande ?",
						accept_to_deliver: "Accepter de livrer cette commande ?",
						we_have_not_restaurant:
							'Nous n"avons pas identifié de restaurant durable dans votre région, veuillez recommander un restaurant ou revenez plus tard.',
						restaurant_name: "Nom du restaurant",
						location: "emplacement",
						email_address: "Adresse e-mail",
						eat_now_or_later: "Mangez maintenant ou plus tard",
						eat_now_or_add_recipe: "Mangez maintenant ou ajoutez une recette",
						weight_volume: "Poids/volume - Plan de repas",
						edit_item: 'Modifier l"article',
						weight_volume_food: "Poids/Volume - Produit alimentaire acheté",
						place_of_purchase: 'Lieu d"achat',
						farmer_list_info: 'Cet agriculteur n"a pas cet article :(',
						gift_food: "Cadeau Nourriture",
						gifted_item: "Objet offert?",
						remove: "Retirer",
						from_your_inventory: 'de l"inventaire ?',
						cannot_find_measurement:
							'Vous ne trouvez pas l"unité de mesure ? sélectionner une autre unité, mesurer et mettre à jour',
						payment: "Paiement",
						continue_to_payment: "Continuer vers le paiement ?",
						prepared_or_raw: "Préparé ou cru",
						purchase_item: 'Acheter l"article',
						continue_purchase: 'Acheter l"article?',
						hello: "Bonjour",
						do_you_want_to: "Voulez-vous demander",
						to_be_delivered: "vous être livré ?",
						order: "Commande",
						add_to_food_waste: "Ajouter aux déchets alimentaires",
						of: "de",
						order_id: "numéro de commande:",
						order_status: "Statut de la commande:",
						product: "Produit",
						quantity: "Quantité",
						supplier: "Fournisseur",
						measure: "Mesure",
						price: "Prix",
						no_notifications: 'Vous n"avez aucune notification :(',
						add_meal: "Ajouter un repas",
						button_submit: "Soumettre",
						ingredient: "Ingrédients",
						edit_meal: "Modifier le repas",
						delivery_date: "La date de livraison",
						farm: "CULTIVER",
						ref_num: "Numéro de référence",
						purchase_list: "Purchase List",
					},
				},
			},
			es: {
				translation: {
					description: {
						tab_food: "Alimento",
						tab_health: "Salud",
						tab_environment: "Ambiente",
						icon_diary: "Mi diario de alimentos",
						icon_save: "Plan para ahorrar",
						my_plan_to_save: "Mi plan para ahorrar",
						meal_diary: "DIARIO DE COMIDAS",
						recipe: "RECETA",
						shopping_list: "LISTA DE LA COMPRA",
						inventory: "INVENTARIO",
						meal_planner: "PLANIFICADOR DE COMIDAS",
						view_plan: "VER PLANO",
						add_meal_diary:
							"Agregue comidas informales a su calendario o edite comidas agregadas",
						my_saved_meals: "Mis comidas guardadas",
						search_recipes: "Buscar Recetas",
						enter_meal_name: "Ingrese el nombre de la comida",
						button_search: "Buscar",
						meal_type: "Tipo de comida:",
						origin: "Origen:",
						any: "Cualquier",
						requirements: "Requisitos:",
						add_other_items: "Añade otros artículos a tu lista de la compra",
						order_all_food_text:
							'Pida todos los alimentos haciendo clic en el botón "Todos" o seleccione los artículos marcando las casillas. Puede editar los alimentos antes de realizar un pedido.',
						no_items_shop:
							"Todavía no hay elementos en la lista :( actualice la página",
						add_new_items: "Agregar nuevos elementos a su inventario",
						please_add_weight:
							"Por favor, agregue el peso/volumen de cada alimento usando la unidad de medida en el plan de comidas y el alimento comprado.",
						changes_to_mealplan:
							'¿Quieres hacer cambios en tu plan de comidas? Agregue más comidas a su plan de comidas haciendo clic en el botón "más" o elimine comidas del plan de comidas eliminándolas de la lista de planes de comidas',
						new_to_mealplan:
							'¿Nuevo en la planificación de comidas? Cree su plan de comidas de 6 meses haciendo clic en el botón "más", usando el botón de búsqueda o sus comidas guardadas o el escáner de código de barras, agregue al menos 7 comidas cada una para el desayuno, el almuerzo y la cena; luego vaya a la pestaña Ver plan para generar un plan de comidas de 6 meses',
						six_month_plan: "Plan de comidas de 6 meses",
						button_all: "Todo",
						button_view_cart: "Ver carrito",
						button_yes: "Sí",
						button_no: "No",
						button_confirm: "Confirmar",
						button_cancel: "Cancelar",
						button_generate: "Generar",
						list_of_items: "Lista de artículos para ordenar",
						regenerate_shop_list: "Regenera tu lista de compras",
						generate_shop_list: "Genere su lista de compras",
						generate_new_list: "¿Generar una nueva lista?",
						order_food_items: "Ordene sus alimentos de su lista de compras",
						meal_name: "Nombre de la comida",
						weight_volume: "Peso/Volumen",
						add_ingredient: "Agregar ingrediente",
						button_done: "Hecho",
						amount: "Cantidad",
						add_new_meal_for: "Agregar nueva comida para",
						eat_home_out: "¿Estás cocinando en casa o comiendo fuera?",
						add_save_meal: "Agregar a comidas guardadas",
						give_this_plan_name: "Dale un nombre a este plan",
						create_six_plan_from:
							"Cree un plan de comidas de 6 meses a partir de",
						add_from_saved_meal: "Añadir desde comidas guardadas",
						add: "Agregar",
						to_calendar: "al Calendario",
						expiry_date: "Fecha de caducidad",
						add_to_inventory: "Agregar nuevo artículo al inventario",
						accept_and_process: "¿Aceptar y procesar este pedido?",
						accept_to_deliver: "¿Aceptar entregar este pedido?",
						we_have_not_restaurant:
							"No hemos identificado un restaurante sostenible en su ubicación, recomiende un restaurante o vuelva a consultar más tarde.",
						restaurant_name: "Nombre del restaurante",
						location: "ubicación",
						email_address: "Su dirección de correo electrónico",
						eat_now_or_later: "Come ahora o más tarde",
						eat_now_or_add_recipe: "Coma ahora o agregue una receta",
						weight_volume: "Peso/volumen - Plan de comidas",
						edit_item: "Editar artículo",
						weight_volume_food: "Peso/Volumen - Alimento comprado",
						place_of_purchase: "Lugar de compra",
						farmer_list_info: "Este agricultor no tiene este artículo :(",
						gift_food: "Comida de regalo",
						gifted_item: "¿Artículo regalado?",
						remove: "Eliminar",
						from_your_inventory: "del inventario?",
						cannot_find_measurement:
							"¿No encuentras la unidad de medida? seleccione otra unidad, mida y actualice",
						payment: "Pago",
						continue_to_payment: "¿Continuar con el pago?",
						prepared_or_raw: "Preparado o crudo",
						purchase_item: "Adquirir artículo",
						continue_purchase: "¿Adquirir artículo?",
						hello: "Hola",
						do_you_want_to: "¿Quieres pedir para¿Quieres pedir para",
						to_be_delivered: "para ser entregado a usted?",
						order: "Orden",
						add_to_food_waste: "Agregar al desperdicio de alimentos",
						of: "de",
						order_id: "Solicitar ID:",
						order_status: "Estado del pedido:",
						product: "Producto",
						quantity: "Cantidad",
						supplier: "Proveedor",
						measure: "Medida",
						price: "Precio",
						no_notifications: "No tienes Notificaciones :(",
						add_meal: "Agregar comida",
						button_submit: "Entregar",
						ingredient: "Ingredientes",
						edit_meal: "Editar comida",
						delivery_date: "Fecha de entrega",
						farm: "GRANJA",
						ref_num: "Número de Ref.",
						purchase_list: 'Liste d"achat',
					},
				},
			},
			ar: {
				translation: {
					description: {
						tab_food: "طعام",
						tab_health: "صحة",
						tab_environment: "بيئة",
						icon_diary: "يوميات طعامي",
						icon_save: "خطة للحفظ",
						my_plan_to_save: "خطتي للحفظ",
						meal_diary: "يوميات الوجبة",
						recipe: "وصفة",
						shopping_list: "قائمة التسوق",
						inventory: "جرد",
						meal_planner: "مخطط الوجبة",
						view_plan: "عرض الخطة",
						add_meal_diary:
							"أضف وجبات غير رسمية إلى التقويم الخاص بك أو قم بتعديل الوجبات المضافة",
						my_saved_meals: "وجباتي المحفوظة",
						search_recipes: "وصفات البحث",
						enter_meal_name: "أدخل اسم الوجبة",
						button_search: "يبحث",
						meal_type: "نوع الوجبة:",
						origin: "أصل:",
						any: "أي",
						requirements: "متطلبات:",
						add_other_items: "أضف عناصر أخرى إلى قائمة التسوق الخاصة بك",
						order_all_food_text:
							'اطلب جميع المواد الغذائية بالنقر فوق الزر "الكل" أو تحديد العناصر عن طريق تحديد المربعات. يمكنك تعديل المواد الغذائية قبل تقديم الطلب.',
						no_items_shop:
							"لا توجد عناصر في القائمة حتى الآن :( الرجاء تحديث الصفحة",
						add_new_items: "أضف عناصر جديدة إلى مخزونك ",
						please_add_weight:
							"يرجى إضافة الوزن / الحجم لكل عنصر غذائي باستخدام وحدة القياس في خطة الوجبة والصنف الذي تم شراؤه.",
						changes_to_mealplan:
							'هل تريد إجراء تغييرات على خطة الوجبة الخاصة بك؟ أضف المزيد من الوجبات إلى خطة الوجبة الخاصة بك عن طريق النقر على زر "علامة الجمع" أو إزالة الوجبات من خطة الوجبات بالحذف من قائمة خطة الوجبات',
						new_to_mealplan:
							'جديد في تخطيط الوجبات؟ أنشئ خطة وجبات مدتها 6 أشهر من خلال النقر على زر "علامة الجمع" ، باستخدام زر البحث أو وجباتك المحفوظة أو ماسح الباركود ، أضف 7 وجبات على الأقل للفطور والغداء والعشاء ؛ ثم انتقل إلى علامة التبويب عرض الخطة لإنشاء خطة وجبات لمدة 6 أشهر',
						six_month_plan: "خطة الوجبة لمدة 6 أشهر",
						button_all: "الجميع",
						button_view_cart: "عرض عربة التسوق",
						button_yes: "نعم",
						button_no: "لا",
						button_confirm: "يتأكد",
						button_cancel: "يلغي",
						button_generate: "يولد",
						list_of_items: "قائمة العناصر للطلب",
						regenerate_shop_list: "تجديد قائمة التسوق الخاصة بك",
						generate_shop_list: "إنشاء قائمة التسوق الخاصة بك",
						generate_new_list: "إنشاء قائمة جديدة؟",
						order_food_items:
							"اطلب المواد الغذائية الخاصة بك من قائمة التسوق الخاصة بك",
						meal_name: "اسم الوجبة",
						weight_volume: "الوزن / الحجم",
						add_ingredient: "أضف المكون",
						button_done: "منتهي",
						amount: "كمية",
						add_new_meal_for: "أضف وجبة جديدة ل",
						eat_home_out: "هل تطبخ في المنزل أم تأكل بالخارج؟",
						add_save_meal: "أضف إلى الوجبات المحفوظة",
						give_this_plan_name: "أعط هذه الخطة اسما",
						create_six_plan_from: "أنشئ خطة وجبات لمدة 6 أشهر من",
						add_from_saved_meal: "أضف من الوجبات المحفوظة",
						add: "يضيف",
						to_calendar: "إلى التقويم",
						expiry_date: "تاريخ الانتهاء",
						add_to_inventory: "إضافة عنصر جديد إلى المخزون",
						accept_and_process: "قبول هذا الطلب ومعالجته؟",
						accept_to_deliver: "هل تقبل تسليم هذا الطلب؟",
						we_have_not_restaurant:
							"لم نحدد مطعمًا مستدامًا في موقعك ، يرجى التوصية بمطعم أو التحقق مرة أخرى لاحقًا.",
						restaurant_name: "اسم المطعم",
						location: "موقع",
						email_address: "عنوان بريدهم الإلكتروني",
						eat_now_or_later: "تناول الطعام الآن أو لاحقًا",
						eat_now_or_add_recipe: "تناول الطعام الآن أو أضف وصفة",
						weight_volume: "الوزن / الحجم - خطة الوجبة",
						edit_item: "تعديل عنصر",
						weight_volume_food: "الوزن / الحجم - المواد الغذائية المشتراة",
						place_of_purchase: "مكان الشراء",
						farmer_list_info: "هذا المزارع ليس لديه هذا العنصر :(",
						gift_food: "طعام هدية",
						gifted_item: "عنصر موهوب؟",
						remove: "يزيل",
						from_your_inventory: "من المخزون؟",
						cannot_find_measurement:
							"لا يمكن العثور على وحدة القياس؟ حدد وحدة أخرى وقم بالقياس والتحديث",
						payment: "قسط",
						continue_to_payment: "الاستمرار في الدفع؟",
						prepared_or_raw: "محضرة أو نيئة",
						purchase_item: "اشتري عنصر",
						continue_purchase: "اشتري عنصر؟",
						hello: "مرحبًا",
						do_you_want_to: "هل تريد طلب",
						to_be_delivered: "ليتم تسليمها لك؟",
						order: "طلب",
						add_to_food_waste: "أضفه إلى بقايا الطعام",
						of: "ل",
						order_id: "رقم التعريف الخاص بالطلب:",
						order_status: ":حالة الطلب",
						product: "منتج",
						quantity: "كمية",
						supplier: "المورد",
						measure: "يقيس",
						price: "سعر",
						no_notifications: "ليس لديك أي إخطارات :(",
						add_meal: "أضف الوجبة",
						button_submit: "يُقدِّم",
						ingredient: "مكونات",
						edit_meal: "تحرير الوجبة",
						delivery_date: "تاريخ التسليم او الوصول",
						farm: "مزرعة",
						ref_num: "المرجع Num",
						purchase_list: "قائمة الشراء",
					},
				},
			},
			zh: {
				translation: {
					description: {
						tab_food: "食物",
						tab_health: "健康",
						tab_environment: "环境",
						icon_diary: "我的美食日记",
						icon_save: "计划储蓄",
						my_plan_to_save: "我的储蓄计划",
						meal_diary: "用餐日记",
						recipe: "食谱",
						shopping_list: "购物清单",
						inventory: "存货",
						meal_planner: "膳食计划",
						view_plan: "查看计划",
						add_meal_diary: "将便餐添加到您的日历或编辑添加的餐点",
						my_saved_meals: "我保存的饭菜",
						search_recipes: "搜索食谱",
						enter_meal_name: "输入餐名",
						button_search: "搜索",
						meal_type: "膳食类型:",
						origin: "起源:",
						any: "任何",
						requirements: "要求:",
						add_other_items: "将其他商品添加到您的购物清单",
						order_all_food_text:
							"通过单击“全部”按钮或通过选中复选框来选择项目来订购所有食品。您可以在下订单前编辑食品。",
						no_items_shop: "列表中还没有项目 :( 请刷新页面",
						add_new_items: "将新项目添加到您的库存 ",
						please_add_weight:
							"请使用膳食计划中的计量单位和购买的食品添加每种食品的重量/体积。",
						changes_to_mealplan:
							"想改变你的膳食计划？通过单击“加号”按钮向您的膳食计划添加更多膳食或通过从膳食计划列表中删除从膳食计划中删除膳食",
						new_to_mealplan:
							"膳食计划新手？通过单击“加号”按钮、使用搜索按钮或您保存的膳食或条形码扫描仪创建您的 6 个月膳食计划，早餐、午餐和晚餐各添加至少 7 餐；然后转到“查看计划”选项卡以生成 6 个月的膳食计划",
						six_month_plan: "6 个月的膳食计划",
						button_all: "全部",
						button_view_cart: "查看购物车",
						button_yes: "是的",
						button_no: "不",
						button_confirm: "确认",
						button_cancel: "取消",
						button_generate: "产生",
						list_of_items: "订购物品清单",
						regenerate_shop_list: "重新生成您的购物清单",
						generate_shop_list: "生成您的购物清单",
						generate_new_list: "生成新列表？",
						order_food_items: "从您的购物清单中订购您的食品",
						meal_name: "餐名",
						weight_volume: "重量/体积",
						add_ingredient: "添加成分",
						button_done: "完毕",
						amount: "数量",
						add_new_meal_for: "添加新餐",
						eat_home_out: "你是在家做饭还是在外面吃饭？",
						add_save_meal: "添加到保存的膳食",
						give_this_plan_name: "给这个计划起个名字",
						create_six_plan_from: "从创建 6 个月的膳食计划",
						add_from_saved_meal: "从保存的膳食中添加",
						add: "添加",
						to_calendar: "到日历",
						expiry_date: "到期日",
						add_to_inventory: "添加新项目到库存",
						accept_and_process: "接受并处理此订单？",
						accept_to_deliver: "接受交付此订单？",
						we_have_not_restaurant:
							"我们尚未在您所在的位置确定一家可持续发展的餐厅，请推荐一家餐厅或稍后再回来查看.",
						restaurant_name: "餐厅名称",
						location: "地点",
						email_address: "他们的电子邮件地址",
						eat_now_or_later: "现在或以后吃",
						eat_now_or_add_recipe: "现在吃或添加食谱",
						weight_volume: "重量/体积 - 膳食计划",
						edit_item: "编辑项目",
						weight_volume_food: "重量/体积 - 购买的食品",
						place_of_purchase: "购买地点",
						farmer_list_info: "这个农民没有这个项目:(",
						gift_food: "礼品食品",
						gifted_item: "赠品？",
						remove: "消除",
						from_your_inventory: "从库存？",
						cannot_find_measurement:
							"找不到计量单位？选择另一个单位，测量和更新",
						payment: "支付",
						continue_to_payment: "继续付款？",
						prepared_or_raw: "准备好的或生的",
						purchase_item: "采购项目",
						continue_purchase: "购买项目？",
						hello: "你好",
						do_you_want_to: "你想申请",
						to_be_delivered: "交付给你？",
						order: "命令",
						add_to_food_waste: "添加到食物垃圾中",
						of: "的",
						order_id: "订单编号：",
						order_status: "订单状态：",
						product: "产品",
						quantity: "数量",
						supplier: "供应商",
						measure: "措施",
						price: "价格",
						no_notifications: "你没有任何通知:(",
						add_meal: "加餐",
						button_submit: "提交",
						ingredient: "原料",
						edit_meal: "编辑膳食",
						delivery_date: "交货日期",
						farm: "农场",
						ref_num: "参考编号",
						purchase_list: "采购清单",
					},
				},
			},
			ru: {
				translation: {
					description: {
						tab_food: "Еда",
						tab_health: "Здоровье",
						tab_environment: "Среда",
						icon_diary: "Мой пищевой дневник",
						icon_save: "Планируйте экономить",
						my_plan_to_save: "Мой план сэкономить",
						meal_diary: "ДНЕВНИК ПИТАНИЯ",
						recipe: "РЕЦЕПТ",
						shopping_list: "СПИСОК ПОКУПОК",
						inventory: "ИНВЕНТАРЬ",
						meal_planner: "ПЛАНИРОВЩИК ПИТАНИЯ",
						view_plan: "ПОСМОТРЕТЬ ПЛАН",
						add_meal_diary:
							"Добавьте обычные блюда в свой календарь или отредактируйте добавленные блюда",
						my_saved_meals: "Мои сохраненные блюда",
						search_recipes: "Поиск рецептов",
						enter_meal_name: "Введите название блюда",
						button_search: "Поиск",
						meal_type: "Тип питания:",
						origin: "Источник:",
						any: "Любой",
						requirements: "Требования:",
						add_other_items: "Добавьте другие товары в список покупок",
						order_all_food_text:
							"Закажите все продукты питания, нажав кнопку «Все», или выберите продукты, установив флажки. Вы можете редактировать продукты питания перед размещением заказа.",
						no_items_shop:
							"В списке пока нет товаров :( пожалуйста, обновите страницу",
						add_new_items: "Добавляйте новые предметы в свой инвентарь ",
						please_add_weight:
							"Пожалуйста, добавьте вес/объем каждого продукта питания, используя единицу измерения в плане питания и купленный продукт.",
						changes_to_mealplan:
							"Хотите внести изменения в свой план питания? Добавьте больше приемов пищи в свой план питания, нажав кнопку «плюс», или удалите приемы пищи из плана питания, удалив их из списка планов питания.",
						new_to_mealplan:
							"Новичок в планировании еды? Создайте свой план питания на 6 месяцев, нажав кнопку «плюс», используя кнопку поиска или сохраненные блюда или сканер штрих-кода, добавьте не менее 7 блюд на завтрак, обед и ужин; затем перейдите на вкладку «Просмотр плана», чтобы создать план питания на 6 месяцев.",
						six_month_plan: "План питания на 6 месяцев",
						button_all: "Bce",
						button_view_cart: "Посмотреть корзину",
						button_yes: "Да",
						button_no: "Нет",
						button_confirm: "Подтверждать",
						button_cancel: "Отмена",
						button_generate: "Создать",
						list_of_items: "Список товаров для заказа",
						regenerate_shop_list: "Восстановите свой список покупок",
						generate_shop_list: "Создайте свой список покупок",
						generate_new_list: "Создать новый список?",
						order_food_items: "Закажите продукты из списка покупок",
						meal_name: "Название еды",
						weight_volume: "Bce/объем",
						add_ingredient: "Добавить ингредиент",
						button_done: "Сделанный",
						amount: "Количество",
						add_new_meal_for: "Добавить новое блюдо для",
						eat_home_out: "Вы готовите дома или едите вне дома?",
						add_save_meal: "Добавить в сохраненные блюда",
						give_this_plan_name: "Дайте этому плану имя",
						create_six_plan_from: "Создайте план питания на 6 месяцев из",
						add_from_saved_meal: "Добавить из сохраненных блюд",
						add: "Добавлять",
						to_calendar: "в Календарь",
						expiry_date: "Дата истечения срока действия",
						add_to_inventory: "Добавить новый предмет в инвентарь",
						accept_and_process: "Принять и обработать этот заказ?",
						accept_to_deliver: "Принять, чтобы доставить этот заказ?",
						we_have_not_restaurant:
							"Мы не нашли экологически чистый ресторан в вашем регионе. Пожалуйста, порекомендуйте ресторан или зайдите позже.",
						restaurant_name: "Название ресторана",
						location: "расположение",
						email_address: "Их адрес электронной почты",
						eat_now_or_later: "Ешьте сейчас или позже",
						eat_now_or_add_recipe: "Ешьте сейчас или добавьте рецепт",
						weight_volume: "Bec/объем - План питания",
						edit_item: "Редактировать элемент",
						weight_volume_food: "Bec/Объем - Купленный продукт питания",
						place_of_purchase: "Место покупки",
						farmer_list_info: "y этого фермера нет этого предмета :(",
						gift_food: "Подарочная еда",
						gifted_item: "Подаренный предмет?",
						remove: "Удалять",
						from_your_inventory: "из инвентаря?",
						cannot_find_measurement:
							"He можете найти единицу измерения? выберите другую единицу, измерьте и обновите",
						payment: "Оплата",
						continue_to_payment: "Продолжить оплату?",
						prepared_or_raw: "Подготовлено или сырцово",
						purchase_item: "Купить товар",
						continue_purchase: "Купить товар?",
						hello: "Привет",
						do_you_want_to: "Вы хотите запросить",
						to_be_delivered: "доставить вам?",
						order: "Заказ",
						add_to_food_waste: "Добавить к пищевым отходам",
						of: "из",
						order_id: "номер заказа:",
						order_status: "Статус заказа:",
						product: "Продукт",
						quantity: "Количество",
						supplier: "Поставщик",
						measure: "Mepa",
						price: "Цена",
						no_notifications: "y вас нет уведомлений :(",
						add_meal: "Добавить еду",
						button_submit: "Представлять на рассмотрение",
						ingredient: "Ингредиенты",
						edit_meal: "Изменить еду",
						delivery_date: "Дата доставки",
						farm: "ФЕРМА",
						ref_num: "№ ссылки",
						purchase_list: "Список покупок",
					},
				},
			},
		},
	});

export default i18n;
