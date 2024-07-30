import CourseRegistrationForm from '@/components/CourseRegistrationForm';
import { styled } from '@pigment-css/react';

const Wrapper = styled.div`
  height: 100vh;
  background-image: linear-gradient(
    50deg,
    hsl(209deg 87% 51%) 0%,
    hsl(209deg 88% 55%) 4%,
    hsl(210deg 88% 60%) 8%,
    hsl(210deg 88% 64%) 12%,
    hsl(211deg 89% 68%) 16%,
    hsl(211deg 90% 72%) 20%,
    hsl(211deg 90% 76%) 25%,
    hsl(213deg 93% 78%) 30%,
    hsl(215deg 94% 81%) 34%,
    hsl(216deg 95% 84%) 39%,
    hsl(218deg 97% 86%) 44%,
    hsl(219deg 100% 89%) 49%,
    hsl(221deg 100% 91%) 53%,
    hsl(219deg 100% 89%) 58%,
    hsl(218deg 97% 86%) 63%,
    hsl(216deg 95% 84%) 67%,
    hsl(215deg 94% 81%) 71%,
    hsl(213deg 93% 78%) 76%,
    hsl(211deg 90% 76%) 80%,
    hsl(211deg 90% 72%) 83%,
    hsl(211deg 89% 68%) 87%,
    hsl(210deg 88% 64%) 90%,
    hsl(210deg 88% 60%) 94%,
    hsl(209deg 88% 55%) 97%,
    hsl(209deg 87% 51%) 100%
  );

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
  return (
    <Wrapper>
      <CourseRegistrationForm />
    </Wrapper>
  );
}
