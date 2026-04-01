import { useState, useEffect, useRef, type FormEvent, type ChangeEvent } from 'react';
import styled from 'styled-components';
import { gsap } from '../../styles/animations';

/* ─── layout ─── */
const Wrapper = styled.section`
  width: 100%;
  background: ${({ theme }) => theme.colors.pageBg};
  padding: 120px 80px;

  ${({ theme }) => theme.media.lg} {
    padding: 100px 48px;
  }

  ${({ theme }) => theme.media.md} {
    padding: 80px 24px;
  }
`;

const Inner = styled.div`
  display: flex;
  gap: 80px;
  align-items: flex-start;

  ${({ theme }) => theme.media.lg} {
    gap: 48px;
  }

  ${({ theme }) => theme.media.md} {
    flex-direction: column;
    gap: 40px;
  }
`;

/* ─── left column ─── */
const LeftCol = styled.div`
  flex: 1;
  padding-top: 20px;

  ${({ theme }) => theme.media.md} {
    padding-top: 0;
  }
`;

const Label = styled.span`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(0,0,0,0.25);
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.headline};
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 800;
  letter-spacing: -1.2px;
  line-height: 1.2;
  color: rgba(0,0,0,0.88);
  margin-bottom: 16px;
  white-space: pre-line;
`;

const Body = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(14px, 1.5vw, 15px);
  font-weight: 400;
  line-height: 1.8;
  color: rgba(0,0,0,0.38);
  max-width: 420px;
`;

const ContactInfo = styled.div`
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContactRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconBox = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #F4F4F5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
`;

const ContactText = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  color: rgba(0,0,0,0.4);
`;

/* ─── right column (form card) ─── */
const FormCard = styled.div`
  flex: 1;
  border-radius: 24px;
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.06);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${({ theme }) => theme.media.md} {
    padding: 28px;
    width: 100%;
  }
`;

const FieldRow = styled.div`
  display: flex;
  gap: 16px;

  ${({ theme }) => theme.media.sm} {
    flex-direction: column;
    gap: 20px;
  }
`;

const FieldGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FieldLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  font-weight: 500;
  color: rgba(0,0,0,0.4);
`;

const Input = styled.input`
  height: 44px;
  border-radius: 10px;
  background: #F4F4F5;
  border: 1px solid rgba(0,0,0,0.06);
  padding: 0 14px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  color: rgba(0,0,0,0.88);
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: rgba(0,0,0,0.2);
  }

  &:focus {
    border-color: #A855F7;
  }
`;

const TextArea = styled.textarea`
  height: 140px;
  border-radius: 10px;
  background: #F4F4F5;
  border: 1px solid rgba(0,0,0,0.06);
  padding: 12px 14px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  color: rgba(0,0,0,0.88);
  outline: none;
  resize: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: rgba(0,0,0,0.2);
  }

  &:focus {
    border-color: #A855F7;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  background: #18181B;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 15px;
  font-weight: 600;
  color: #FFFFFF;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const FormFooter = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  color: rgba(0,0,0,0.2);
  text-align: center;
  margin: 0;
`;

const SuccessMessage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  font-weight: 500;
  color: rgba(0,0,0,0.6);
  text-align: center;
  line-height: 1.6;

  ${({ theme }) => theme.media.md} {
    min-height: 280px;
  }
`;

/* ─── component ─── */
interface FormData {
  company: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  company: '',
  name: '',
  phone: '',
  email: '',
  message: '',
};

export default function ContactSection() {
  const wrapperRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    if (!wrapperRef.current) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const ctx = gsap.context(() => {
      /* left column: fade in + slide up with scrub */
      gsap.from(leftRef.current, {
        y: isMobile ? 30 : 60,
        opacity: 0,
        scrollTrigger: {
          trigger: leftRef.current,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1,
        },
      });

      /* right column (form card): fade in + slide up with slight delay via later start */
      gsap.from(rightRef.current, {
        y: isMobile ? 30 : 60,
        opacity: 0,
        scrollTrigger: {
          trigger: rightRef.current,
          start: 'top 88%',
          end: 'top 50%',
          scrub: 1,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <Wrapper id="contact" ref={wrapperRef}>
      <Inner>
        {/* Left column */}
        <LeftCol ref={leftRef}>
          <Label>CONTACT</Label>
          <Title>
            {'당신의 다음 이벤트에도\nKIOROBO의 솔루션을\n도입해 보세요.'}
          </Title>
          <Body>
            단순한 기기 렌탈을 넘어, 브랜드와 팬덤을 연결하는 가장 확실한 시스템을
            구축해 드립니다. 지금 바로 문의를 남겨주세요.
          </Body>
          <ContactInfo>
            <ContactRow>
              <IconBox>&#9993;</IconBox>
              <ContactText>contact@kiorobo.com</ContactText>
            </ContactRow>
            <ContactRow>
              <IconBox>&#9742;</IconBox>
              <ContactText>02-1234-5678</ContactText>
            </ContactRow>
          </ContactInfo>
        </LeftCol>

        {/* Right column — form card */}
        <FormCard ref={rightRef}>
          {submitted ? (
            <SuccessMessage>
              문의가 접수되었습니다.
              <br />
              빠른 시일 내 연락드리겠습니다.
            </SuccessMessage>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
              <FieldRow>
                <FieldGroup>
                  <FieldLabel>소속 (회사/기관명) *</FieldLabel>
                  <Input
                    name="company"
                    placeholder="회사명을 입력해주세요"
                    value={form.company}
                    onChange={handleChange}
                    required
                  />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>이름 *</FieldLabel>
                  <Input
                    name="name"
                    placeholder="담당자명"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </FieldGroup>
              </FieldRow>

              <FieldRow>
                <FieldGroup>
                  <FieldLabel>연락처 *</FieldLabel>
                  <Input
                    name="phone"
                    placeholder="010-0000-0000"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </FieldGroup>
                <FieldGroup>
                  <FieldLabel>이메일 *</FieldLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="email@company.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </FieldGroup>
              </FieldRow>

              <FieldGroup>
                <FieldLabel>문의 내용 *</FieldLabel>
                <TextArea
                  name="message"
                  placeholder="도입하고자 하는 이벤트나 프로젝트에 대해 알려주세요"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </FieldGroup>

              <SubmitButton type="submit">솔루션 제안받기</SubmitButton>
              <FormFooter>제출 시 개인정보 처리방침에 동의합니다.</FormFooter>
            </form>
          )}
        </FormCard>
      </Inner>
    </Wrapper>
  );
}
