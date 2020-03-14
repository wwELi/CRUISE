
import React, { useRef, useEffect, useMemo } from 'react';

export default function Popup(props) {

  const { content, visible, children, onClose, contentStyle } = props;

  const elRef = useRef(null);
  const contentRef = useRef(null);
  const popUpKey = useMemo(() => Symbol(), []);

  useEffect(() => () => Popup.delete(popUpKey), []);

  const style = useMemo(() => {

    if (visible) {
      Popup.delete(popUpKey);
      Popup.close();
      Popup.add(popUpKey, onClose);

      setTimeout(() => {
        window.addEventListener('click', Popup.close, false);

        if (contentRef.current) {
          contentRef.current.scrollIntoView(false);
        }
      })
    } else {
      window.removeEventListener('click', Popup.close);
    }

    const { offsetLeft = 0, offsetTop = 0, offsetHeight = 0 } = elRef.current || {};

    return {
      display: visible ? 'block' : 'none',
      position: 'absolute',
      top: offsetTop + offsetHeight,
      left: offsetLeft,
      ...contentStyle
    }

  }, [visible]);

  const onContentClick = evt => evt.stopPropagation();

  return (
    <>
      { React.cloneElement(children, { ref: elRef }) }
      <section style={style}>
        { React.cloneElement(content, { ref: contentRef, onClick: onContentClick }) }
      </section>
    </>
  );
}

Popup.popupMap = new Map();

Popup.close = () => {
  [...Popup.popupMap.values()].forEach(close => close());
  Popup.popupMap.clear();
};

Popup.delete = key => Popup.popupMap.delete(key);
Popup.add = (key, popup) => Popup.popupMap.set(key, popup);
