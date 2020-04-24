import PropTypes from "prop-types"
import React, { useLayoutEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import ImagePalette from "react-image-palette"
import gsap from "gsap"

import arrow from "../assets/arrowmd.svg"

const Hero = ({ lastBlogPost = false }) => {
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
      <HeroContent txt={txt} img={img} payload={lastBlogPost} />
    </React.Fragment>
  )
}

export const HeroContent = ({ txt, img, payload }) => {
  const title = React.useRef()
  const subTitle = React.useRef()
  const imageMask = React.useRef()
  const image = React.useRef()
  const introduction = React.useRef()

  useLayoutEffect(() => {
    const animation = gsap
      .timeline({ delay: 0.5, defaults: { ease: "power3.out" } })
      .from(title.current, {
        duration: 1,
        y: "100%",
      })
      .from(
        subTitle.current,
        {
          duration: 1,
          y: "100%",
        },
        "-=0.7"
      )
      .fromTo(
        imageMask.current,
        { x: "0%" },
        {
          duration: 1.5,
          x: "-100%",
          ease: "power3.inOut",
        }
      )
      .from(
        image.current,
        {
          duration: 1.5,
          scale: 1.3,
        },
        "-=1"
      )
      .from(".ft-grid-box", {
        duration: 1,
        y: -10,
        ease: "power3.out",
        opacity: 0,
        stagger: 0.2,
      })
    animation.play()
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
          <p className="intro-text ft-grid-box" ref={introduction}>
            {txt}
          </p>
          {payload && <LastBlogPostCard lastBlogPost={payload} />}
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

const LastBlogPostCard = ({ lastBlogPost }) => {
  const { title, description } = lastBlogPost.frontmatter
  const { src } = lastBlogPost.frontmatter.cover.childImageSharp.fluid
  return (
    <div className="hero-lastbp--container ft-grid-box">
      <h1>
        <span>
          Last Blog Post <img src={arrow} alt="" />
        </span>
      </h1>
      <ImagePalette image={src}>
        {({ backgroundColor, color, alternativeColor }) => (
          <div
            style={{ backgroundImage: `url(${src})` }}
            className="hero-lastbp--card"
          >
            <div style={{ backgroundColor }} className="card-overlay"></div>
            <div className="card-overlay-content">
              <h3 style={{ color }}>{title}</h3>
              <p style={{ color: alternativeColor }}>{description}</p>
            </div>
          </div>
        )}
      </ImagePalette>
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
