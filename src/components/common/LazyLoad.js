import ReactLazyLoad from 'react-lazyload'
import { PLACEHOLDER_IMG } from '@/constants'
import { useRef, useState, useEffect } from 'react'

function LazyLoad(props) {
  const [styles, setStyles] = useState({ width: '100%', height: 'auto', marginTop: '-16%' })
  const img = useRef(null)

  useEffect(() => {
    window.addEventListener('resize', checkStyles)
    return () => {
      window.removeEventListener('resize', checkStyles)
    }
  }, [])

  /**
   * @description Check for the aspect ratio difference between the image resolution
   * and the parent, accordingly decide the styles to apply
   *
   */
  function checkStyles() {
    if (img.current) {
      setStyles({
        ...styles,
        margin: 'auto',
        filter: 'blur(8px)',
      })
      const { naturalWidth, naturalHeight, parentElement } = img.current
      const { clientHeight, clientWidth } = parentElement
      const parentAspectRatio = (clientWidth / clientHeight).toFixed(3)
      const imgAspectRatio = (naturalWidth / naturalHeight).toFixed(3)
      setStyles({
        width: imgAspectRatio >= parentAspectRatio ? 'auto' : '100%',
        height: imgAspectRatio >= parentAspectRatio ? '100%' : 'auto',
      })
    }
  }

  return (
    <ReactLazyLoad placeholder={<img src={PLACEHOLDER_IMG} />}>
      <img className="article-img" ref={img} {...props} style={styles} onLoad={checkStyles} />
    </ReactLazyLoad>
  )
}

export default LazyLoad
