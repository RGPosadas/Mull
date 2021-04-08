export const updateChatContainerStyle = (
  setContainerStyle: (value: React.SetStateAction<React.CSSProperties>) => void,
  targetRef: React.MutableRefObject<HTMLDivElement>
) => {
  const chatInputContainer = document.getElementById('chat-input-container');
  if (chatInputContainer) {
    const margin =
      document.documentElement.clientHeight - chatInputContainer.getBoundingClientRect().top;
    setContainerStyle({ marginBottom: margin + 'px' });
    setTimeout(() => {
      window.scrollTo({ top: targetRef.current.clientHeight + 1000 });
    }, 100);
  }
};

export const chatInputOnFocus = (
  chatInputBot: React.MutableRefObject<string>,
  setContainerStyle: (value: React.SetStateAction<React.CSSProperties>) => void,
  targetRef: React.MutableRefObject<HTMLDivElement>
) => {
  if (window.innerWidth < 800) {
    const botNav = document.getElementsByClassName('bot-nav-container')[0] as HTMLDivElement;
    botNav.style.display = 'none';

    const chatInputContainer = document.getElementById('chat-input-container');

    chatInputBot.current = chatInputContainer.style.bottom;

    chatInputContainer.style.bottom = '0';

    updateChatContainerStyle(setContainerStyle, targetRef);
  }
};
export const chatInputOnBlur = (
  chatInputBot: React.MutableRefObject<string>,
  setContainerStyle: (value: React.SetStateAction<React.CSSProperties>) => void,
  targetRef: React.MutableRefObject<HTMLDivElement>
) => {
  if (window.innerWidth < 800) {
    const botNav = document.getElementsByClassName('bot-nav-container')[0] as HTMLDivElement;
    botNav.style.display = 'block';

    const chatInputContainer = document.getElementsByClassName(
      'chat-input-container'
    )[0] as HTMLDivElement;

    chatInputContainer.style.bottom = chatInputBot.current;

    updateChatContainerStyle(setContainerStyle, targetRef);
  }
};
