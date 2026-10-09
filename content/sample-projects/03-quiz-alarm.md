---
title: Quiz alarm
lesson: Project 3
type: project
summary: An alarm clock that gets the time from the internet and only goes quiet once you answer three questions on the screen correctly.
---
*Mornings in the dorm: the alarm rings, a hand hits snooze, and nobody makes first period. Your third build is an alarm you cannot snooze. It asks questions, and it keeps ringing until you get three right.*

> **Hardware:** the **IA Kit** with its screen, and a Wi-Fi network with internet access. Screen functions are on the [IA Screen API](https://site.incipeacademy.com/doc/screen-library). Original starter: [Quiz Alarm](https://site.incipeacademy.com/doc/quiz-alarm).

## What you will build

- Set the alarm hour and minute with **+** and **−** buttons on the screen.
- Every 5 seconds the kit fetches the time over Wi-Fi and shows the date and time.
- At the alarm time it rings and shows a random question. A correct answer brings the next one; three correct answers stop it.

## How it works

1. **Set:** screen buttons change `set_hour` and `set_min`.
2. **Fetch the time:** the kit asks a website for its home page. Every web reply starts with headers, and one of them is the date and time, `Date: …`, in GMT. The starter reads the characters at fixed positions in that reply.
3. **Compare:** when `hour` and `min` equal the alarm time, switch to a question page and ring.
4. **Quiz:** pages 3 to 10 each hold one question. `random(3, 11)` picks one; each correct answer adds one to `count`.

Before you start, design the screen: page 0 with places for the date, the time and the alarm time, plus **+** and **−** buttons for hour and minute; pages 3 to 10 with one question each and a button for the correct answer.

## Starter code

Replace `YOUR_WIFI_NAME` and `YOUR_WIFI_PASSWORD` with your network's.

```cpp
// Fill in the place with /* */

/* include Incipe library*/

int count = 0; // count no. of correct ans
char ascii_time = 0;
int hour = 0;
int min = 0;
int min1 = 0;
int min2 = 0;
unsigned long previous_time = 0;
int interval = 5000; // 5s
int set_hour = 0;
int set_min = 0;
int randomNumber = 0;

#define SSID        "YOUR_WIFI_NAME"
#define PASSWORD    "YOUR_WIFI_PASSWORD"
#define HOST_NAME   "www.baidu.com"
#define HOST_PORT   (80)

void setup(void)
{
  Serial.begin(9600);
  incipe.init();

  randomSeed(1111); // for generating random number

  if (incipe.wifi.joinAP(SSID, PASSWORD))
  {
    Serial.print("Join AP success\r\n");
    Serial.print("IP:");
    Serial.println( incipe.wifi.getLocalIP().c_str());
  }
  else
  {
    Serial.print("Join AP failure\r\n");
  }
  incipe.wifi.disableMUX();
}

void loop(void)
{
  // set alarm time
  if (/* when a button is pressed */)
  {
    /* change set_hour depending on pressing + or - */
    /* print set_hour on screen */
  }
  /* repeat the process for min */

  //get actual time
  if (millis() - previous_time >= interval)
  {
    previous_time = millis();
    uint8_t buffer[1024] = {0};

    if (incipe.wifi.createTCP(HOST_NAME, HOST_PORT))
    {
      Serial.print("create tcp ok\r\n");
    }
    else
    {
      Serial.print("create tcp err\r\n");
    }

    char *hello = "GET / HTTP/1.1\r\nHost: www.baidu.com\r\nConnection: close\r\n\r\n";
    incipe.wifi.send((const uint8_t*)hello, strlen(hello));

    uint32_t len = incipe.wifi.recv(buffer, sizeof(buffer), 10000);
    if (len > 0)
    {
      for(uint32_t i = 0; i < len; i++)
      {
        if (i >= 123 && i <= 133)
        {
          /* (char)buffer[i] is the date, show it on screen */
        }
        if (i >= 135 && i <= 136)
        {
          // ascii_time = buffer[i];
          // if (ascii_time == 55){hour = 15;}
          // else if (ascii_time == 56){hour = 16;}
          // else if (ascii_time == 57){hour = 17;}
          /* print hour on screen */
        }
        if (i == 138)
        {
          min1 = buffer[i] - 48;
        }
        if (i == 139)
        {
          min2 = buffer[i] - 48;
        }
      }
      min = min1 * 10 + min2;
      /* print hour on screen */
    }

    incipe.wifi.releaseTCP();
  }

  //reach alarm time, ans Q
  if(set_hour == hour /* AND */ set_min == min)
  {
    randomNumber = random(3, 11); // generate random number from 3 to 10
    incipe.SwitchPage(randomNumber); // change pages
    while (/* correct number of ans smaller than 3 */)
    {
    incipe.PlaySound(); // start alarm
    delay(500);
    if (/* page value is 3 */)
    {
      if (/* button of correct ans is pressed */)
    {
      /* increase the count */
      randomNumber = random(3, 11); // generate random number from 3 to 10
    }
    }
    /* repeat for remaining pages (different questions) */
    incipe.screenWriteValue(/* name of your button */, -1);
    }
    incipe.SwitchPage(0);
  }
}
```

Upload it once before you fill anything in and open the serial monitor at **9600** baud: `Join AP success` and an `IP:` line mean the kit is online.

## Fill in the blanks

### 1. Include the library

<details>
<summary>Show the answer</summary>

```cpp
#include "incipe.h"
```
</details>

### 2. Set the alarm

Each **+** or **−** button has a value you read with `incipe.screenReadValue()`. After reading a press, write to the value with `incipe.screenWriteValue()`, as the starter does, so one press counts once. `% 24` keeps hours between 0 and 23.

<details>
<summary>Show the answer for the hour</summary>

```cpp
if (incipe.screenReadValue("hourUp.val") == true)
{
  set_hour = (set_hour + 1) % 24;
  incipe.onscreen("setHour", set_hour);
  incipe.screenWriteValue("hourUp.val", -1);
}
if (incipe.screenReadValue("hourDown.val") == true)
{
  set_hour = (set_hour + 23) % 24;   // one less, wrapping 0 back to 23
  incipe.onscreen("setHour", set_hour);
  incipe.screenWriteValue("hourDown.val", -1);
}
```

Repeat with `minUp`, `minDown`, `set_min`, `setMin` and `% 60`.
</details>

### 3. Read the date

Characters 123 to 133 of the reply are the date. Collect them into one `String`, then show it once.

<details>
<summary>Show the answer</summary>

```cpp
String date = "";            // before the for loop
// …inside the loop:
if (i >= 123 && i <= 133)
{
  date += (char)buffer[i];
}
// …after the loop:
incipe.onscreen("date", date);
```
</details>

### 4. Read the hour, in your time zone

Characters 135 and 136 are the hour in GMT. A digit's character code minus 48 (or `'0'`) is the digit itself; the starter does this for the minutes. The commented lines turn three GMT hours into Hong Kong time (GMT+8) by hand. Do it for every hour instead.

<details>
<summary>Show the answer</summary>

```cpp
if (i == 135) { hour = (buffer[i] - '0') * 10; }
if (i == 136) { hour = (hour + (buffer[i] - '0') + 8) % 24; }   // + 8 for GMT+8
```

After the loop, show both. The starter's second `print hour` comment should show the minutes:

```cpp
incipe.onscreen("hour", hour);
incipe.onscreen("min", min);
```
</details>

### 5. Is it alarm time?

Both must be true.

<details>
<summary>Show the answer</summary>

```cpp
if (set_hour == hour && set_min == min)
```
</details>

### 6. The quiz

Keep ringing while fewer than three answers are correct. On each question page, check that page's correct-answer button.

<details>
<summary>Show the answer for page 3</summary>

```cpp
while (count < 3)
{
  incipe.PlaySound(); // start alarm
  delay(500);
  if (randomNumber == 3)
  {
    if (incipe.screenReadValue("ans3.val") == true)
    {
      count++;
      randomNumber = random(3, 11);
    }
    incipe.screenWriteValue("ans3.val", -1);
  }
  // …the same for pages 4 to 10, with ans4 … ans10
}
```
</details>

## Spot the bugs

Finish the sketch, set the alarm one minute ahead and wait. Three things go wrong.

<details>
<summary>1. A correct answer does not show a new question</summary>

The sketch picks a new `randomNumber` but never shows that page. Add `incipe.SwitchPage(randomNumber);` after it.
</details>

<details>
<summary>2. The next day the alarm stops at once</summary>

`count` is still 3 from yesterday, so `while (count < 3)` never runs. Set `count = 0;` just before the `while`.
</details>

<details>
<summary>3. The questions come in the same order every time</summary>

`randomSeed(1111)` starts the random sequence at the same place on every power-on. Seed it from something that changes, for example `randomSeed(millis());` the first time a button is pressed.
</details>

## Test it

| Do this | Expect |
| --- | --- |
| Power on | `Join AP success`, then the date and time on screen within 5 seconds |
| Press hour **+** twice | The alarm hour goes up by 2 |
| Set the alarm one minute ahead | It rings and shows a question |
| Answer correctly three times | Back to page 0, quiet |
| Answer wrongly | It keeps ringing |

## Make it better

- **Make the time robust.** Fixed positions break the day the website changes its reply. Search the reply for `Date: ` and read the characters after it instead.
- Show how many answers are left: `incipe.onscreen("left", 3 - count)`.
- Set the volume: `incipe.screenMode("volume", 50)`.

## You can now

- Fetch data from the internet over Wi-Fi and pick out the part you need.
- Build a multi-page screen app with buttons.
- Find bugs that only show up the second time a program runs.

**Next:** one board, one job so far. Make two boards work together, so a sensor in one corner switches a purifier in the other.
