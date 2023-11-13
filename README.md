# LMS FrontEnd

### Set Up Instructrion

1. Clone The Project
```
    git clone https://github.com/manish25Coder/LMS_frontend.git
``` 

2. Move Into The Directory 
```
    cd lms-frontend
```

3. Install The Dependencies 
```
    npm i
```

4. Run The Server 
```
    npm run dev
```


### Set Up Instruction For Tailwind

[Tail Wind Official Instruction Doc ](https://tailwindcss.com/docs/installation)

1. Install Tailwind Css
```
    npm install -D tailwindcss
```

2. Create Tailwind Config File
```
    npx tailwindcss init
```

3. Add File Extensions To Tailwind Config File In The Content Property
```
    "./src/**/*.{html,js,jsx,ts,tsx}"
```

4. Add The Tailwind Directives At The Top Of The  `index.css` file
```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```

### Addind Plugins And Dependencies

```
npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp
```

### Configure auto import sort esline

1. Install Simple Import Sort 
```
    npm i -D eslint-plugin-simple-import-sort
```

2. Add Rule In `.eslint.cjs`
```
    'simple-import-sort/imports':'error'
```

3. Add Simple-Import Sort Plugin In `.eslint.cjs`
```
    plugins: [... ,'simple-import-sort']
```

4. To Enable Auto Import Sort On File Save In Vscode
    -Open `settings.json`
    -Add The Following Config
```
    "editor.codeActionsOnSave":{
        "source.fixAll.eslint":true
    }
``` 