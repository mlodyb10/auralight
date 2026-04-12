import { Composition, registerRoot } from 'remotion'
import { AuraLoop } from './AuraLoop'
import { AuraShowcase } from './AuraShowcase'

function Root() {
  return (
    <>
      <Composition
        id="AuraLoop"
        component={AuraLoop}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AuraShowcase"
        component={AuraShowcase}
        durationInFrames={180}
        fps={30}
        width={800}
        height={500}
      />
    </>
  )
}

registerRoot(Root)
