import { v4 as uuidv4 } from "uuid";

export const data = {
  catégories: {
    boissons: {
      "bubble tea": {
        filtres: ["Tout", "Fruits", "Lait"],
        produits: [
          {
            id: uuidv4(),
            type: "Lait",
            image: require("../assets/img/coco-3-guys.jpg"),
            nom: "Bubble Tea Black Jelly",
            description: "So jellycious !",
            disponibilité: false,
            allergènes: {
              vache: ["Lactose"],
              amande: ["Fruits à coque"],
              soja: ["Soja"],
              avoine: ["Aucun"]
            },
            options: {
              multiple: {
                extras: [{ nom: "Jelly", prix: 1 }],
              },
              unique: {
                lait: ["Vache", "Amande", "Soja", "Avoine"],
                "taux de sucre": ["Faible", "Moyen", "Elevé"],
                thé: ["Vert", "Noir"],
                température: ["Chaud", "Froid"],
                taille: [
                  { nom: "Petit", prix: 5 },
                  { nom: "Moyen", prix: 6 },
                  { nom: "Grand", prix: 7 },
                ],
              },
            },
          },
          {
            id: uuidv4(),
            type: "Fruits",
            image: require("../assets/img/coco-bubble-gaga.jpg"),
            nom: "Bubble Tea Mangue",
            description: "Il rend complètement gaga !",
            disponibilité: true,
            allergènes: ["Aucun"],
            options: {
              multiple: {
                extras: [
                  { nom: "Tapioca", prix: 1 },
                  { nom: "Litchi", prix: 1 },
                  { nom: "Mangue", prix: 1 },
                ],
              },
              unique: {
                "taux de sucre": ["Faible", "Moyen", "Elevé"],
                thé: ["Vert", "Noir"],
                bulles: ["Tapioca", "Litchi", "Mangue", "Aucune"],
                température: ["Chaud", "Froid"],
                taille: [
                  { nom: "Petit", prix: 5 },
                  { nom: "Moyen", prix: 6 },
                  { nom: "Grand", prix: 7 },
                ],
              },
            },
          },
          {
            id: uuidv4(),
            type: "Lait",
            image: require("../assets/img/coco-pearl-milk-tea.jpg"),
            nom: "Bubble Tea Chocolat",
            description: "Il est fort en chocolat !",
            disponibilité: true,
            allergènes: {
              vache: ["Lactose"],
              amande: ["Fruits à coque"],
              soja: ["Soja"],
              avoine: ["Aucun"]
            },
            options: {
              multiple: {
                extras: [
                  { nom: "Tapioca", prix: 1 },
                  { nom: "Gelée de sucre roux", prix: 1 },
                ],
              },
              unique: {
                lait: ["Vache", "Amande", "Soja", "Avoine"],
                "taux de sucre": ["Faible", "Moyen", "Elevé"],
                thé: ["Vert", "Noir"],
                bulles: ["Tapioca", "Gelée de sucre roux", "Aucune"],
                température: ["Chaud", "Froid"],
                taille: [
                  { nom: "Petit", prix: 5 },
                  { nom: "Moyen", prix: 6 },
                  { nom: "Grand", prix: 7 },
                ],
              },
            },
          },
          {
            id: uuidv4(),
            type: "Fruits",
            image: require("../assets/img/coco-grapefruit-yakult.jpg"),
            nom: "Bubble Tea Pamplemousse doux",
            description: "Un zeste de douceur !",
            disponibilité: true,
            allergènes: ["Aucun"],
            options: {
              multiple: {
                extras: [
                  { nom: "Tapioca", prix: 1 },
                  { nom: "Litchi", prix: 1 },
                ],
              },
              unique: {
                "taux de sucre": ["Faible", "Moyen", "Elevé"],
                thé: ["Vert", "Noir"],
                bulles: ["Tapioca", "Litchi", "Aucune"],
                température: ["Chaud", "Froid"],
                taille: [
                  { nom: "Petit", prix: 5 },
                  { nom: "Moyen", prix: 6 },
                  { nom: "Grand", prix: 7 },
                ],
              },
            },
          },
          {
            id: uuidv4(),
            type: "Lait",
            image: require("../assets/img/coco-sago-taro-milk-tea.jpg"),
            nom: "Bubble Tea Taro",
            description: "Gustativement original !",
            disponibilité: true,
            allergènes: {
              vache: ["Lactose"],
              amande: ["Fruits à coque"],
              soja: ["Soja"],
              avoine: ["Aucun"]
            },
            options: {
              multiple: {
                extras: [
                  { nom: "Tapioca", prix: 1 },
                  { nom: "Gelée de sucre roux", prix: 1 },
                ],
              },
              unique: {
                lait: ["Vache", "Amande", "Soja", "Avoine"],
                "taux de sucre": ["Faible", "Moyen", "Elevé"],
                thé: ["Vert", "Noir"],
                bulles: ["Tapioca", "Gelée de sucre roux", "Aucune"],
                température: ["Chaud", "Froid"],
                taille: [
                  { nom: "Petit", prix: 5 },
                  { nom: "Moyen", prix: 6 },
                  { nom: "Grand", prix: 7 },
                ],
              },
            },
          },
          {
            id: uuidv4(),
            type: "Lait",
            image: require("../assets/img/coco-strawberry-latte.jpg"),
            nom: "Bubble Tea Fraise",
            description: "Si simple et si doux !",
            disponibilité: true,
            allergènes: {
              vache: ["Lactose"],
              amande: ["Fruits à coque"],
              soja: ["Soja"],
              avoine: ["Aucun"]
            },
            options: {
              multiple: {
                extras: [
                  { nom: "Tapioca", prix: 1 },
                  { nom: "Gelée de sucre roux", prix: 1 },
                ],
              },
              unique: {
                lait: ["Vache", "Amande", "Soja", "Avoine"],
                "taux de sucre": ["Faible", "Moyen", "Elevé"],
                thé: ["Vert", "Noir"],
                bulles: ["Tapioca", "Gelée de sucre roux", "Aucune"],
                température: ["Chaud", "Froid"],
                taille: [
                  { nom: "Petit", prix: 5 },
                  { nom: "Moyen", prix: 6 },
                  { nom: "Grand", prix: 7 },
                ],
              },
            },
          },
          {
            id: uuidv4(),
            type: "Lait",
            image: require("../assets/img/coco-red-bean-matcha-milk-tea.jpg"),
            nom: "Bubble Tea Matcha",
            description: "Le plus atypique !",
            disponibilité: false,
            allergènes: {
              vache: ["Lactose"],
              amande: ["Fruits à coque"],
              soja: ["Soja"],
              avoine: ["Aucun"]
            },
            options: {
              unique: {
                lait: ["Vache", "Amande", "Soja", "Avoine"],
                "taux de sucre": ["Faible", "Moyen", "Elevé"],
                thé: ["Vert", "Noir"],
                température: ["Chaud", "Froid"],
                taille: [
                  { nom: "Petit", prix: 5 },
                  { nom: "Moyen", prix: 6 },
                  { nom: "Grand", prix: 7 },
                ],
              },
            },
          },
          {
            id: uuidv4(),
            type: "Lait",
            image: require("../assets/img/coco-grass-jelly.jpg"),
            nom: "Bubble Tea Gelée noire",
            description: "La crème de la crème !",
            disponibilité: true,
            allergènes: {
              vache: ["Lactose"],
              amande: ["Fruits à coque"],
              soja: ["Soja"],
              avoine: ["Aucun"]
            },
            options: {
              multiple: {
                extras: [
                  { nom: "Tapioca", prix: 1 },
                  { nom: "Gelée de sucre roux", prix: 1 },
                ],
              },
              unique: {
                lait: ["Vache", "Amande", "Soja", "Avoine"],
                "taux de sucre": ["Faible", "Moyen", "Elevé"],
                thé: ["Vert", "Noir"],
                bulles: ["Tapioca", "Gelée de sucre roux", "Aucune"],
                température: ["Chaud", "Froid"],
                taille: [
                  { nom: "Petit", prix: 5 },
                  { nom: "Moyen", prix: 6 },
                  { nom: "Grand", prix: 7 },
                ],
              },
            },
          },
        ],
      },
    },
    nourriture: {
      "banh mi": {
        filtres: ["Tout", "Végé", "Poulet", "Boeuf"],
        produits: [
          {
            id: uuidv4(),
            type: "Poulet",
            image: require("../assets/img/banh_mi_poulet.jpg"),
            nom: "Banh Mi Poulet",
            description: "Avec du bon poulet mariné !",
            disponibilité: true,
            prix: 3.5,
            allergènes: ["Gluten"],
            régime: ["Halal"],
            options: {
              multiple: {
                légumes: ["Concombre", "Carotte", "Coriandre"],
                extras: [{ nom: "Sauce piquante", prix: 1 }],
              },
              unique: {
                "sauce piquante": ["Oui", "Non"],
              },
            },
          },
          {
            id: uuidv4(),
            type: "Boeuf",
            image: require("../assets/img/banh_mi_boeuf.jpg"),
            nom: "Banh Mi Boeuf",
            description: "Vreuument bon !",
            disponibilité: true,
            prix: 3.5,
            allergènes: ["Gluten"],
            régime: ["Halal"],
            options: {
              multiple: {
                légumes: ["Concombre", "Carotte", "Coriandre"],
                extras: [{ nom: "Sauce piquante", prix: 1 }],
              },
              unique: {
                "sauce piquante": ["Oui", "Non"],
              },
            },
          },
          {
            id: uuidv4(),
            type: "Végé",
            image: require("../assets/img/banh_mi_vege.jpg"),
            nom: "Banh Mi Végé",
            description: "Healthy and yummy !",
            disponibilité: true,
            prix: 3.5,
            allergènes: ["Gluten"],
            régime: ["Vegan"],
            options: {
              multiple: {
                légumes: ["Concombre", "Carotte", "Coriandre"],
                extras: [{ nom: "Sauce piquante", prix: 1 }],
              },
              unique: {
                "source de protéines": ["Tofu", "Simili canard-laqué"],
                "sauce piquante": ["Oui", "Non"],
              },
            },
          },
        ],
      },
      wraps: {
        filtres: ["Tout", "Végé", "Poulet", "Boeuf"],
        produits: [
          {
            id: uuidv4(),
            type: "Poulet",
            image: require("../assets/img/wrap_poulet.jpg"),
            nom: "Wrap Poulet",
            description: "Basique mais bon !",
            disponibilité: true,
            prix: 3,
            allergènes: ["Gluten"],
            régime: ["Halal"],
            options: {
              multiple: {
                légumes: ["Concombre", "Carotte", "Coriandre"],
                extras: [{ nom: "Sauce piquante", prix: 1 }],
              },
              unique: {
                "sauce piquante": ["Oui", "Non"],
              },
            },
          },
          {
            id: uuidv4(),
            type: "Boeuf",
            image: require("../assets/img/wrap_boeuf.jpg"),
            nom: "Wrap Boeuf",
            description: "Le préféré du staff !",
            disponibilité: false,
            prix: 3,
            allergènes: ["Gluten"],
            régime: ["Halal"],
            options: {
              multiple: {
                légumes: ["Concombre", "Carotte", "Coriandre"],
                extras: [{ nom: "Sauce piquante", prix: 1 }],
              },
              unique: {
                "sauce piquante": ["Oui", "Non"],
              },
            },
          },
          {
            id: uuidv4(),
            type: "Végé",
            image: require("../assets/img/wrap_vege.jpg"),
            nom: "Wrap Végé",
            description: "Il n'y a que du bon là-dedans !",
            disponibilité: true,
            prix: 3,
            allergènes: ["Gluten"],
            régime: ["Vegan"],
            options: {
              multiple: {
                légumes: ["Concombre", "Carotte", "Coriandre"],
                extras: [{ nom: "Sauce piquante", prix: 1 }],
              },
              unique: {
                "source de protéines": ["Tofu", "Simili canard-laqué"],
                "sauce piquante": ["Oui", "Non"],
              },
            },
          },
        ],
      },
    },
  },
};
