document.addEventListener('alpine:initialized', () => {
    const targetHour = 21;
    const targetMinute = 0;
    const targetSecond = 0;
    const pauseDuration = 60 * 60 * 1000;

    function getBrasiliaTime() {
        const options = { timeZone: 'America/Sao_Paulo', hour12: false };
        const now = new Date().toLocaleString('en-US', options);
        return new Date(now);
    }

    function calculateTimeRemaining(targetTime) {
        const now = getBrasiliaTime();
        const timeDifference = targetTime - now;
        const totalSeconds = Math.floor(timeDifference / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return {
            total: totalSeconds,
            hours,
            minutes,
            seconds
        };
    }

    function updateCountdown() {
        const now = getBrasiliaTime();
        let targetTime = getBrasiliaTime()
        targetTime.setHours(targetHour, targetMinute, targetSecond, 0);

        let originalTargetTime = new Date(targetTime);

        let finishPause = new Date(targetTime);
        finishPause.setTime(finishPause.getTime() + pauseDuration);

        if (now > targetTime) {
            targetTime.setDate(now.getDate() + 1);
        }

        const remainingTime = calculateTimeRemaining(targetTime);

        if (remainingTime.total <= 0 || (now > originalTargetTime && now <= finishPause)) {
            startPauseCountdown();
        } else {
            document.getElementById('countdown').innerHTML =
                `${remainingTime.hours.toString().padStart(2, '0')}:${remainingTime.minutes.toString().padStart(2, '0')}:${remainingTime.seconds.toString().padStart(2, '0')}`;
            setTimeout(updateCountdown, 1000);
        }
    }

    function startPauseCountdown() {
        dispatchToogleOnCountdown(false);

        const targetTime = getBrasiliaTime()
        targetTime.setHours(targetHour, targetMinute, targetSecond, 0);
        targetTime.setTime(targetTime.getTime() + pauseDuration);

        let timeLeft = Math.floor((targetTime - getBrasiliaTime()) / 1000);

        const interval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;

            document.getElementById('pause').innerHTML =
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(interval);
                dispatchToogleOnCountdown(true);
                updateCountdown();
            }
        }, 1000);
    }

    function dispatchToogleOnCountdown(status) {
        window.dispatchEvent(new CustomEvent('tooglecountdown', {
            detail: {
                status
            }
        }));
    }

    updateCountdown(); // Inicializa a contagem regressiva
});