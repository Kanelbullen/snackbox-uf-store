'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function CookiePopup() {
  const [accepted, setAccepted] = useState(true);
  const [offscreen, setOffscreen] = useState(true);
  useEffect(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('allows-cookies='))
      ?.split('=')[1];
    if (cookieValue != 'true') {
      setAccepted(false);
      setTimeout(() => {
        setOffscreen(false);
      }, 100);
    }
  }, []);

  function accept() {
    const expiers = new Date();
    expiers.setFullYear(expiers.getFullYear() + 5);
    document.cookie = `allows-cookies=true; expires=${expiers.toUTCString()}; SameSite=lax; secure`;
    setOffscreen(true);
    setTimeout(() => {
      setAccepted(true);
    }, 100);
  }

  return (
    <>
      {!accepted && (
        <div
          className="fixed bottom-4 left-4 mr-4 flex max-w-96 items-center gap-2 rounded-md border-border bg-background p-4 
                shadow-md transition-transform ease-linear data-[offscreen=true]:-translate-x-[150%]"
          data-offscreen={offscreen}
        >
          <div>
            <span className="text-sm font-medium text-foreground">
              Denna webbplats använder kakor
            </span>
            <p className="text-sm font-light text-muted-foreground">
              Denna webbplats använder enbart nödvändiga kakor.
            </p>
          </div>
          <Button size="sm" onClick={accept}>
            Jag förstår
          </Button>
        </div>
      )}
    </>
  );
}
