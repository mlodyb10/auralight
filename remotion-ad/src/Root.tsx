import React from 'react'
import { Composition, registerRoot } from 'remotion'
import { AuraAd } from './AuraAd'
import { loadFont as loadGrotesk } from '@remotion/google-fonts/SpaceGrotesk'
import { loadFont as loadCormorant } from '@remotion/google-fonts/CormorantGaramond'

loadGrotesk()
loadCormorant()

function RemotionRoot() {
  return (
    <Composition
      id="AuraAd"
      component={AuraAd}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
    />
  )
}

registerRoot(RemotionRoot)
