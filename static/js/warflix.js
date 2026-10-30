(() => {
  // Cartes interactives : un seul écouteur pour tous les points de toutes les cartes
  document.addEventListener("click", (e) => {
    const point = e.target.closest(".carte-point");
    if (point) {
      const carte = point.closest(".carte");
      carte.querySelectorAll(".carte-point").forEach((b) => b.classList.toggle("actif", b === point));
      const info = carte.querySelector(".carte-info");
      const blocs = [];
      if (point.dataset.titre) {
        const titre = document.createElement("h3");
        titre.textContent = point.dataset.titre;
        blocs.push(titre);
      }
      const texte = document.createElement("p");
      texte.textContent = point.dataset.texte || "Aucune information disponible.";
      blocs.push(texte);
      info.replaceChildren(...blocs);
      return;
    }

    // Aide au placement : ajoute ?coords à l'URL, puis clique sur la carte
    // pour lire les valeurs "gauche" et "haut" à copier dans le front matter.
    if (location.search.includes("coords") && e.target.matches(".carte-wrap img")) {
      const r = e.target.getBoundingClientRect();
      const gauche = ((e.clientX - r.left) / r.width * 100).toFixed(1);
      const haut = ((e.clientY - r.top) / r.height * 100).toFixed(1);
      e.target.closest(".carte").querySelector(".carte-info").textContent = `gauche: ${gauche}  |  haut: ${haut}`;
    }
  });

  // Frise : chaque étape apparaît quand on arrive dessus
  const etapes = document.querySelectorAll(".frise li");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entrees) => {
      entrees.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("visible"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.2 });
    etapes.forEach((li) => obs.observe(li));
  } else {
    etapes.forEach((li) => li.classList.add("visible"));
  }
})();
