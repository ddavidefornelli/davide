class PortfolioCard extends HTMLElement {
  set cardData(value) {
    this._cardData = value;
    this.render();
  }

  render() {
    if (!this._cardData) {
      return;
    }

    const { eyebrow, title, description, details, href, target, rel } =
      this._cardData;
    const tagName = href ? "a" : "article";
    const card = document.createElement(tagName);

    card.className = `card ${href ? "card--link" : "card--static"}`;

    if (href) {
      card.href = href;

      if (target) {
        card.target = target;
      }

      if (rel) {
        card.rel = rel;
      }
    }

    const eyebrowElement = document.createElement("p");
    eyebrowElement.className = "card__eyebrow";
    eyebrowElement.textContent = eyebrow;

    const titleElement = document.createElement("h3");
    titleElement.className = "card__title";
    titleElement.textContent = title;

    const descriptionElement = document.createElement("p");
    descriptionElement.className = "card__description";
    descriptionElement.textContent = description;

    if (eyebrow) {
      card.append(eyebrowElement);
    }

    card.append(titleElement, descriptionElement);

    if (details?.length) {
      const detailsElement = document.createElement("div");
      detailsElement.className = "card__details";

      details.forEach((detail) => {
        const detailElement = document.createElement("p");
        detailElement.className = "card__detail";
        detailElement.textContent = detail;
        detailsElement.append(detailElement);
      });

      card.append(detailsElement);
    }

    this.replaceChildren(card);
  }
}

if (!customElements.get("portfolio-card")) {
  customElements.define("portfolio-card", PortfolioCard);
}
