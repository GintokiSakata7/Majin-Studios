"use client";

import {
  useState,
} from "react";

import {
  SCANFEAST_CASE_STUDY,
} from "./scanfeast-data";

export default function ScanfeastProduct() {
  return (
    <section className="sf-section sf-product">
      <div className="sf-section__intro">
        <span>02 / PRODUCT</span>

        <h2>
          THE SYSTEM
          <br />
          BECOMES A SCREEN.
        </h2>
      </div>

      <div className="sf-product__stack">
        {SCANFEAST_CASE_STUDY.productSurfaces.map(
          (surface) => (
            <ProductSurface
              key={surface.number}
              {...surface}
            />
          ),
        )}
      </div>
    </section>
  );
}

function ProductSurface({
  number,
  label,
  title,
  description,
  image,
}: (typeof SCANFEAST_CASE_STUDY.productSurfaces)[number] & { image?: string }) {
  const [
    failed,
    setFailed,
  ] = useState(false);

  return (
    <article className="sf-product-card">
      <div className="sf-product-card__copy">
        <span>
          {number} / {label}
        </span>

        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>
      </div>

      <div className="sf-product-card__visual">
        {failed ? (
          <div className="sf-product-card__missing">
            <span>
              PRODUCT SURFACE
            </span>
            <strong>
              {label}
            </strong>
            <small>
              CAPTURE REQUIRED
            </small>
          </div>
        ) : (
          <img
            src={image}
            alt={label}
            loading="lazy"
            decoding="async"
            onError={() =>
              setFailed(true)
            }
          />
        )}
      </div>
    </article>
  );
}
