import React, { useEffect, useState } from 'react';
import { getProduct } from '../api/Api';
import { Product } from './types/Types';
import './ProductView.css';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Rating } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { addToCart } from '../redux/CartReducer';
import { useDispatch } from 'react-redux';
const ProductView: React.FC = () => {
  const { t } = useTranslation();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [titleColor, setTitleColor] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [showDescription, setShowDescription] = useState(false);
  const [value, setValues] = useState<number | null>(null);
  const dispatch = useDispatch()
  useEffect(() => {
    const pathname = window.location.pathname;
    const id = pathname.substring(pathname.lastIndexOf('/') + 1);

    getProduct(id)
      .then((response) => setProduct(response.data))
      .catch((error) => {
        console.log('Error fetching product:', error);
      });
  }, []);

  const handleColorSelection = (color: string) => {
    setSelectedColor(color);
    switch (color) {
      case 'color-one':
        setTitleColor('#0a3251');
        break;
      case 'color-two':
        setTitleColor('#eedddd');
        break;
      case 'color-three':
        setTitleColor('#ebc6f5');
        break;
      default:
        setTitleColor('');
        break;
    }
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const toggleDescription = () => {
    setShowDescription((prevShowDescription) => !prevShowDescription);
  };

  if (!product) {
    return <div>{t('global.loading')}</div>;
  }

  const displayedImages = product.images.slice(0, 4);
  const similarProducts = product.images.slice(10, 10);

  return (
    <>
      <div className="product-content"></div>
      <div className='product-details'>
        <div className='product-images'>
          <div className="current-image">
            <img
              className="productView-image"
              src={selectedImage || product.images[0]}
              alt={product.title}
            />
          </div>
          <div className="detailed-images">
            {displayedImages.map((image, index) => (
              <img
                key={index}
                className="detailed-image"
                src={image}
                alt={product.title}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>

        <div className="product-details-wrapper">
          <h2 className="productView-title" style={{ color: titleColor }}>
            {product.title}
          </h2>
          <div className='product-status'>
            <h3 className='product-status-text' style={{ color: titleColor }}>{t('global.inStock')}</h3>
            <LocationOnOutlinedIcon className='product-status-icon' />
          </div>
          <div className='product-features'>
            <div className="product-settings">
              <div className="product-color-paletes">
                <div
                  className={`color color-one ${selectedColor === 'color-one' ? 'selected' : ''}`}
                  onClick={() => handleColorSelection('color-one')}
                ></div>
                <div
                  className={`color color-two ${selectedColor === 'color-two' ? 'selected' : ''}`}
                  onClick={() => handleColorSelection('color-two')}
                ></div>
                <div
                  className={`color color-three ${selectedColor === 'color-three' ? 'selected' : ''}`}
                  onClick={() => handleColorSelection('color-three')}
                ></div>
              </div>
              <div className="product-memory">
              </div>
            </div>
            <div className="product-sizes">
              <ul className="product-s-d">
                <li>
                  <div className="spec-l-side">
                    <span className="spec-name" style={{ color: titleColor }}>{t('global.screenSize')}: </span>
                  </div>
                  <b style={{ color: titleColor }}>  6.1 inches</b>
                </li>
                <li>
                  <div className="spec-l-side">
                    <span className="spec-name" style={{ color: titleColor }}>{t('global.ram')}:</span>
                  </div>
                  <b style={{ color: titleColor }}>  6 GB</b>
                </li>
                <li>
                  <div className="spec-l-side">
                    <span className="spec-name" style={{ color: titleColor }}>{t('global.rom')}:</span>
                  </div>
                  <b style={{ color: titleColor }}>  128 GB</b>
                </li>
                <li>
                  <div className="spec-l-side">
                    <span className="spec-name" style={{ color: titleColor }}>{t('global.camera')}: </span>
                  </div>
                  <b style={{ color: titleColor }}>  48+12+12+TOF</b>
                </li>
              </ul>
            </div>
          </div>
          <div className="product-memory-title">
            <span style={{ color: titleColor }}className='memory'>{t('global.memory')}:</span>
            <div style={{ color: titleColor }}className="product-memories">
              <h2 className="memories">128GB</h2>
              <h2 className="memories">256GB</h2>
              <h2 className="memories">512GB</h2>
              <h2 className="memories">1TBS</h2>
            </div>
            <div className="product-memory-title">
            <span style={{ color: titleColor }}className='review'>{t('global.review')}:</span>
            <div className="product-memories">
            <Rating className='rating'
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValues(newValue);
                  }}
                />
            </div>
            <div className='addToCartButton'>
            <button
  onClick={() => dispatch(addToCart(product))}
  className="addToCart1"
>
  {t('global.addToCart')}
</button>

            </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="details" onClick={toggleDescription}>{t('global.details')}</button>
        {showDescription && (
          <div className='productDescription'>
      <p className='description'>{product.description.split('\n').map((line: string, index: number) => (
          <React.Fragment key={`${product.id}-${index}`}>
            {line}
            <br />
          </React.Fragment>
        ))}</p>
          </div>
        )}
      </div>
      <div className="detailed-images">
            {similarProducts.map((image, index) => (
              <img
                key={index}
                className="detailed-image"
                src={image}
                alt={product.title}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
    </>
  );
};
export default ProductView;
