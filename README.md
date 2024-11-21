 Task Manager App 

Velkommen til Weekly Calendar Task Manager! Denne applikation er designet til at hjælpe dig med effektivt at håndtere dine ugentlige opgaver, holde styr på prioriteringer og forblive organiseret. Bygget med React og TypeScript, tilbyder den funktioner som opgave filtrering, tastatur tilgængelighed, fokus mode og meget mere for at skabe en produktiv planlægnings oplevelse.

Installation
Klon repository: git clone https://github.com/username/repository-name.git
Gå til projektmappen: cd repository-name
Installer afhængigheder: npm install
Kør Applikationen
Start udviklings serveren: npm run dev
Åbn din browser og navigér til: http://localhost:5173

Funktioner : 
Tilføj, rediger og slet opgaver: Opret, ændr eller slet opgaver hurtigt og nemt ved hjælp af intuitive UI-komponenter. Opgaver kan tilføjes med titel, kategori, deadline, prioritet og farve.

Ugentlig visning: Se alle dine opgaver for ugen, grupperet efter dage, i et visuelt kalenderformat.

Fokusmode: Isoler dagens opgaver med en særlig fokusmode, der giver dig mulighed for at koncentrere dig om de mest presserende opgaver.

Tastaturnavigation og tilgængelighed: Naviger nemt i applikationen ved hjælp af tastaturet, med funktioner som tab-indekser, ARIA-etiketter og fokusbare knapper.

Opgavefiltrering og sortering: Filtrer opgaver efter prioritet, deadline eller kategori, og sorter opgaverne efter de samme kriterier. Dette gør det nemt at finde det, du har brug for, når du har brug for det.

Markering af opgaver som fuldført: Opgaver kan markeres som fuldførte, hvilket udløser en visuel konfetti-animation, der fejrer din succes.

Slet opgaver: Opgaver kan fjernes fra listen med et enkelt klik.

Brugerdefinerede kategorier: Opret og brug brugerdefinerede kategorier ud over de standardkategorier, der allerede er tilgængelige.

Farvevalg: Vælg en farve for hver opgave for at gøre dem lettere at identificere og visualisere prioritering.

Visuelt design: Tilpassede farvetemaer for opgaver gør det nemt at prioritere og skelne mellem forskellige opgaver visuelt.

Teknologier : 
React & TypeScript: Fundamentet for at opbygge en moderne, type-sikker brugergrænseflade.
CSS: Bruges til responsiv styling og layout.
React Hooks: Bruges til at håndtere tilstand (useState) og tilføje livscyklusfunktioner (useEffect).
Canvas Confetti: Anvendes til at skabe en visuel fejring, når opgaver fuldføres.

Brug
Tilføj en opgave
Klik på knappen "Tilføj opgave" for at åbne formularen til opgave oprettelse.
Udfyld formularen med opgavens titel, kategori, deadline og prioritet.
Vælg en eksisterende kategori, eller opret en brugerdefineret kategori ved at vælge "Andet" og indtaste den ønskede kategori.
Vælg en farve til din opgave fra de tilgængelige muligheder.
Klik på "Tilføj" for at tilføje opgaven til listen. Hvis en brugerdefineret kategori er valgt, gemmes den til fremtidig brug.

Sortering af opgaver
Opgaver kan sorteres efter:
Prioritet: Fra "Høj" til "Lav" prioritet.
Deadline: Tætteste deadline vises først.
Kategori: Alfabetisk sortering.
For at ændre sorteringskriterierne kan du bruge dropdown-menuen i filter-sektionen.

Markér en opgave som fuldført
Klik på "Markér opgave som fuldført"-knappen for at ændre opgavens status til fuldført.
Dette vil udløse en konfetti-animation og tilføje en gennemført stil til opgaven.

Redigering og sletning af opgaver
Klik på en opgave for at åbne Opgavekortet. Her kan du redigere opgaven eller slette den helt.
Klik på "Slet"-knappen for at fjerne en opgave fra listen.

Fokus-mode
Klik på knappen "Fokus-mode" for at isolere dagens opgaver, så du kan arbejde uden distraktioner.


Tastaturnavigation
Naviger problemfrit i appen ved hjælp af tastaturet. Brug Enter- eller Mellemrum-tasterne til at lukke paneler eller interagere med knapper.
Tilgængelighedsfunktioner
Dette projekt lægger vægt på tilgængelighed for at gøre applikationen brugbar for alle. Her er nogle af de implementerede tilgængelighedsfunktioner:
ARIA-labels: Tilføjet ARIA-labels til knapper, billeder og interaktive elementer for at beskrive deres formål for skærmlæsere.
Tastatur Fokus: Alle interaktive elementer kan fokuseres og betjenes via tastaturet.
Visuelt skjulte labels: Labels, der er skjult visuelt, men tilgængelige for hjælpeværktøjer, sikrer, at alle kan navigere i formularerne.
useState i Task Manager
useState bruges til at håndtere tilstande i applikationen, som for eksempel opgaver, visningen af formularen, inputfelterne (titel, kategori, deadline, etc.), og filtreringskriterier.
setTasks, setFilter, setTitle, setCategory, etc., bruges til at opdatere tilstandene i komponenten, og ændringer i tilstandene trigger en re-render af komponenten.
Sortering og filtrering af opgaver
Filtrering: Brugeren kan filtrere opgaverne ved at vælge et kriterium (f.eks. prioritet, deadline, eller kategori) via en dropdown-menu.
Sortering: Opgaverne sorteres i henhold til det valgte filter. Filtreringen håndteres af funktionen sortTasks(), der anvender forskellige metoder for at sortere opgaverne baseret på prioritet, deadline eller kategori.
