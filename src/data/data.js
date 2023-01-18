import { v4 as uuidv4 } from 'uuid';

export const data = {
  catégories: {
    boissons: {
      "bubble tea": {
        filtres: ["Fruits", "Lait"],
        produits: [
          {
            id: uuidv4(),
            type: "Fruits",
            image: require("../assets/img/coco-strawberry-latte.png"),
            nom: "Bubble Tea Mango Tropical",
            description: "Bestseller",
            disponibilité: true,
            allergènes: [""],
            options: {
              multiple: {
                extras: [
                  ["Tapioca", "2€"],
                  ["Litchi", "2€"],
                ],
              },
              unique: {
                bulles: ["Tapioca", "Litchi", "Aucune"],
                "taux de sucre": ["Faible", "Moyen", "Elevé"],
                thé: ["Vert", "Noir"],
                température: ["Chaud", "Froid"],
                taille: [
                   ["Petit", "5€"],
                   ["Moyen", "6€"],
                   ["Grand", "7€"],
                ],
              }
            },
          },
          {
            id: uuidv4(),
            type: "Lait",
            image: require("../assets/img/coco-strawberry-latte.png"),
            nom: "Brown Sugar",
            description: "Chaud froid, c'est délicieux!",
            disponibilité: true,
            allergènes: [""],
            options: {
              multiple: {
                extras: [
                  ["Tapioca", "2€"],
                  ["Litchi", "2€"],
                ],
              },
              unique: {
                bulles: ["Tapioca", "Litchi", "Aucune"],
                "taux de sucre": ["Faible", "Moyen", "Elevé"],
                thé: ["Vert", "Noir"],
                température: ["Chaud", "Froid"],
                taille: [
                   ["Petit", "5€"],
                   ["Moyen", "6€"],
                   ["Grand", "7€"],
                ],
              }
            },
          },
          {
            id: uuidv4(),
            type: "Fruits",
            image: require("../assets/img/coco-strawberry-latte.png"),
            nom: "Pamplemousse doux",
            description: "Une vraie douceur!",
            disponibilité: true,
            allergènes: [""],
            options: {
              multiple: {
                extras: [
                  ["Tapioca", "2€"],
                  ["Litchi", "2€"],
                ],
              },
              unique: {
                bulles: ["Tapioca", "Litchi", "Aucune"],
                "taux de sucre": ["Faible", "Moyen", "Elevé"],
                thé: ["Vert", "Noir"],
                température: ["Chaud", "Froid"],
                taille: [
                   ["Petit", "5€"],
                   ["Moyen", "6€"],
                   ["Grand", "7€"],
                ],
              }
            },
          },

        ],
      },
    },
    nourriture: {
      "banh mi": {
        filtres: ["Végé", "Poulet", "Boeuf"],
        produits: [
          {
            id: uuidv4(),
            type: "Poulet",
            image: require("../assets/img/banhmi-viande.png"),
            nom: "Banh Mi Poulet",
            description: "Qui est très bon",
            disponibilité: true,
            prix: "3€",
            allergènes: [""],
            régime: ["Halal", "Vegan"],
            options: {
              multiple: {
                légumes: ["Concombre", "Carotte", "Coriandre"],
                extras: [
                  ["Sauce piquante", "2€"],
                ],
              },
              unique: {
                "sauce piquante": ["Oui", "Non"],
              }
            },
          },
        ],
      },
      wraps: {
        filtres: ["Végé", "Poulet", "Boeuf"],
        produits: [
          {
            id: uuidv4(),
            type: "Poulet",
            image: require("../assets/img/banhmi-viande.png"),
            nom: "Wrap Poulet",
            description: "Basic!",
            disponibilité: true,
            prix: "3€",
            allergènes: [""],
            régime: ["Halal", "Vegan"],
            options: {
              multiple: {
                légumes: ["Concombre", "Carotte", "Coriandre"],
                extras: [
                  ["Sauce piquante", "2€"],
                ],
              },
              unique: {
                "sauce piquante": ["Oui", "Non"],
              }
            },
          },
          {
            id: uuidv4(),
            type: "Boeuf",
            image: require("../assets/img/banhmi-viande.png"),
            nom: "Wrap Boeuf",
            description: "Le préféré du staff!",
            disponibilité: true,
            prix: "3€",
            allergènes: [""],
            régime: ["Halal", "Porc"],
            options: {
              multiple: {
                légumes: ["Concombre", "Carotte", "Coriandre"],
                extras: [
                  ["Sauce piquante", "2€"],
                ],
              },
              unique: {
                "sauce piquante": ["Oui", "Non"],
              }
            },
          },
          {
            id: uuidv4(),
            type: "Végé",
            image: require("../assets/img/banhmi-viande.png"),
            nom: "Wrap Végé",
            description: "Basic!",
            disponibilité: false,
            prix: "3€",
            allergènes: [""],
            régime: ["Halal", "Vegan"],
            options: {
              multiple: {
                extras: [
                  ["Sauce piquante", "2€"],
                  ["Ketchup", "2€"],
                  ["Mayonnaise", "2€"],
                ],
              },
              unique: {                
                légumes: ["Concombre", "Carotte", "Coriandre"],
                "sauce piquante": ["Oui", "Non"],
              }
            },
          },
        ],
      },
    },
  },
};