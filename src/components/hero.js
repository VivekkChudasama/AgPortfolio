import PropTypes from "prop-types"
import React, { useLayoutEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import gsap from "gsap"

const Hero = ({ siteTitle }) => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      {
        allMarkdownRemark(
          filter: {
            frontmatter: { templateKey: { eq: "home-page-customizer" } }
          }
        ) {
          edges {
            node {
              frontmatter {
                introTxt
                profileImg {
                  childImageSharp {
                    fluid {
                      src
                      srcSet
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  const { introTxt: txt } = allMarkdownRemark.edges[0].node.frontmatter
  const {
    fluid: img,
  } = allMarkdownRemark.edges[0].node.frontmatter.profileImg.childImageSharp

  return (
    <React.Fragment>
      <HeroContent txt={txt} img={img} />
    </React.Fragment>
  )
}

export const HeroContent = ({ txt, img, cmsPreviewImg }) => {
  const title = React.useRef()
  const subTitle = React.useRef()
  const imageMask = React.useRef()
  const image = React.useRef()
  const introduction = React.useRef()

  useLayoutEffect(() => {
    gsap.from(title.current, {
      duration: 1,
      y: "100%",
      delay: 0.3,
      ease: "power3.out",
    })
    gsap.from(subTitle.current, {
      duration: 1,
      y: "100%",
      delay: 0.8,
      ease: "power3.out",
    })
    gsap.to(imageMask.current, {
      duration: 1.5,
      x: "-100%",
      delay: 1.5,
      ease: "power3.inOut",
    })
    gsap.from(image.current, {
      duration: 1.5,
      scale: 1.3,
      delay: 1.8,
      ease: "power3.out",
    })
    gsap.from(introduction.current, {
      duration: 1,
      y: -10,
      delay: 1,
      ease: "power3.out",
      opacity: 0,
    })
  })

  return (
    <div className="section-hero">
      <div className="section-hero--grid">
        <div className="hero-grid-one">
          <div className="hero-title-container">
            <div className="hero-title">
              <h1>
                <span ref={title}>Abderrahmane</span>
              </h1>
              <h1>
                <span ref={subTitle}>Grana</span>
              </h1>
            </div>
          </div>
          <p ref={introduction}>{txt}</p>
        </div>
        <div className="hero-grid-two">
          <div className="hero-image-container">
            <div className="hero-image-mask">
              <img
                ref={image}
                src={img.src ? img.src : img}
                srcSet={img.srcSet && img.srcSet}
                alt=""
              />
              <div ref={imageMask} className="testMask"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Hero.propTypes = {
  siteTitle: PropTypes.string,
}

Hero.defaultProps = {
  siteTitle: ``,
}

export default Hero