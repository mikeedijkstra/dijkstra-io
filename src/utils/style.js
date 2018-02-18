import styled, { css, keyframes } from 'styled-components'

const media = {
  sm: (...args) => css`
    @media (min-width: ${props => props.theme.screen.sm}) {
      ${ css(...args) }
    }
  `,
  md: (...args) => css`
    @media (min-width: ${props => props.theme.screen.md}) {
      ${ css(...args) }
    }
  `,
  lg: (...args) => css`
    @media (min-width: ${props => props.theme.screen.lg}) {
      ${ css(...args) }
    }
  `,
  xl: (...args) => css`
    @media (min-width: ${props => props.theme.screen.xl}) {
      ${ css(...args) }
    }
  `
}

const fadeSequence = keyframes`
  100% { opacity: 1; }
`;

const fadeIn = () => {
  return `
    animation: ${fadeSequence} .5s forwards;
    opacity: 0;
  `
}

export { fadeIn, media }
