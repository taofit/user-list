import LoadUsers from './components/API';
import { CompareObjects } from './helpers/helper';

test('loadAllUser', async () => {
  const data = await LoadUsers();
  expect(data.length).toBeGreaterThan(0);
});

test('compareUser', () => {
  const userA = {
    email: "jesper.turesson@tretton37.com",
    gitHub: "jturesson90",
    highlighted: false,
    imagePortraitUrl: "https://i.1337co.de/profile/jesper-turesson",
    imageWallOfLeetUrl: "https://i.1337co.de/wallofleet/jesper-turesson",
    linkedIn: "/in/jesperturesson/",
    mainText: "<p>I had the idea that I wanted to create music and study to be a Music Producer. However, I found a Computer Science programme that focused on sounds and music that attracted me even more. It was here that I learnt programming, and have loved it ever since the day I first held my own app in my hand.</p><p>After my graduation, I went to Malmö to learn more about programming games for smartphones. It’s probably no surprise to know that I usually have a few game projects on the go using Unity3D or Unreal Engine.</p> <p>Although I have experience in native app development and developing games, the biggest part of my professional life has been spent in the .Net/C# environment. I have found the most satisfaction in my work when I can see it being experienced by the end user. I love challenging myself and am always eager to learn new stuff.</p> <p>When I’m not working, I like to spend time with my girlfriend and friends. There are many late nights spent creating games or playing video games. During the summer I love to dance Bugg, and in the winter I go snowboarding.</p> ",
    manager: "karl.ecstrom@tretton37.com",
    name: "Jesper Turesson",
    office: "Borlänge",
    orgUnit: "/Employees",
    phoneNumber: "+46704613379",
    published: true,
    stackOverflow: "4537471",
    twitter: "@jturesson90"
  }
  const userB = {
    email: "joakim.nystrom@tretton37.com",
    gitHub: "jnsytromdesign",
    highlighted: false,
    imagePortraitUrl: "https://i.1337co.de/profile/joakim-nystrom",
    imageWallOfLeetUrl: "https://i.1337co.de/wallofleet/joakim-nystrom",
    linkedIn: "/in/joakimnystrom/",
    mainText: "<p>I've always been looking for new ways to express ideas and utilise my creativity. I started out as a designer 12 years ago, and did some tampering with Wordpress themes but I wasn't satisfied with getting ALMOST what I wanted, so I started to learn PHP and JS in order to dig deeper into the code. A few years later, I could pretty much declare myself a LAMP-fullstack developer and I have never looked back. Of course, nowadays my tech stack looks a bit different, but the drive to not settle for less than what I want, is still what pushes me.</p><p>Today I'm sort of a hybrid of frontend developer and designer, who fights the battles for the end user. One might say: UX-orientated developer.</p><p>I love trying out new technology, frameworks, methods and tools. Continuous learning is essential to me, but also passing on knowledge to others. One of my virtues is \"Be a good node in your network\".</p><p>For me, programming is more than just a means to an end, because;</p><p>1. It's probably the closest thing to magic there is.</p><p>2. It teaches you how to think (at least structured problem solving).</p><p>3. It can be used as model to observe (and hack) the world.</p><p>When I'm off the keyboard, I mostly spend time with my awesome family, experimenting in the kitchen with new dishes/breads or tend to my tomato and chili plants.</p> ",
    manager: "anders.iggsten@tretton37.com",
    name: "Joakim Nyström",
    office: "Stockholm",
    orgUnit: "/Employees",
    phoneNumber: "+46733981337",
    published: true,
    stackOverflow: "5306676",
    twitter: "jnystromdesign"
  }
  expect(CompareObjects(userA, userB, 'name')).toBe(-1);
  expect(CompareObjects(userA, userB, 'office')).toBe(-1);
});
