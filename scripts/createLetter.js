function createLetter() {
    let randomName = names[Math.floor(Math.random() * 5)];
    let themeBody = letterExamples[Math.floor(Math.random() * 5)];
    themeBody[1] += '\n' +
            '---\n' +
            'Всего наилучшего,\n' + randomName + '.';
    return [randomName, themeBody[0], themeBody[1]];
}


let names =
    ['Ельченко Елизар',
        'Красоткин Олег',
        'Степихов Федор',
        'Уваров Борис',
        'Федосов Давид'];

let letterExamples = [
    ['Приемная компания',
        'Привет!\n' +
        '\n' +
        'Не знаешь еще что будешь делать летом? Есть интересная задача в приемной комиссии Государственного университета.\n' +
        '\n' +
        'Таска #1\n' +
        'С 20 июня по 15 августа c 10 до 17 часов\n' +
        'Нужно будет консультировать абитуриентов за стойкой факультета.\n' +
        'Работа оплачивается\n' +
        'Таска #2\n' +
        'Уже сейчас до 27 мая с 16 до 21 часов (несколько раз в неделю)\n' +
        'Нужно приглашать абитуриентов по телефону\n' +
        'Работа оплачивается\n' +
        '\n' +
        'Захотелось узнать больше или подать заявку напиши мне в тг @Univer'],
    ['Ассемблер: вопросы к экзамену',
        '1) Регистры общего назначения, сегментные, FPU, MMX, SSE, арифметические и логические команды (сложение, xor, сдвиги...), управляющие структуры (if, циклы, switch).\n' +
        '2) Команды передачи управления (переходы, вызов функций, возврат), стандартные конвенции вызова функций (cdecl, stdcall, pascal, fastcall, thiscall, fastcall64, unix64).\n' +
        '3) Команды пересылки данных, система адресации в командах.\n' +
        '4) Режимы работы процессора. Защищённый режим и страничная адресация, их применение.\n' +
        '5) SIMD расширения набора команд x86 (MMX и типы данных всех подробно; SSE, SSE2, SSE3, SSSE3, SSE4.1, SSE4.2, SSE4A, AVX, AVX2, AVX512, FMA, AES-NI, BMI - обзорно).\n' +
        '6) Новое и изменения в архитектуре x64 относительно x86.\n' +
        '\n' +
        'Все вопросы подразумевают не только архитектуру x86, но и x64.\n' +
        'Кроме теоретического ответа я могу попросить вас написать небольшую программу, особенно в вопросе 5.'],
    ['Лабораторная по МТ',
        'Добрый день.\n' +
        '\n' +
        'Началась новая лабораторная по машинам Тьюринга.\n' +
        'Срок выполнения в pcms\n' +
        '\n' +
        'Некоторые пояснения к лабораторной:\n' +
        'выводить надо в выходной файл саму машину Тьюринга, описание есть в первой задаче.\n' +
        'чекеры на задачи и исходные примеры прикреплены к письму.\n' +
        'запускать чекеры примерно так:  java -jar Check.jar Check test outfile trash, где test файл из samples, outfile вывод вашей машины Тьюринга.\n' +
        '\n' +
        '  Примерный формат для многоленточной машины Тьюринга.\n' +
        'Символы и состояния в машине Тьюринга - произвольные строки без пробелов.\n' +
        'формат многоленточной машины:\n' +
        'n = ntapes (Количество лент)\n' +
        '(state letter_1 letter_2 ... letter_n -> state_to letter_to_1 direction_1 ... letter_to_n direction_n)\n' +
        'Стартовое состояние - S, допускающее - AC, отвергающее - RJ, blank - _ (подчёркивание)\n' +
        'Например:\n' +
        '2\n' +
        'S 0 0 -> a 1 > 2 >\n' +
        'a 1 1 -> S 333 ^ szdf <\n' +
        'a 2 3 -> AC 333 ^ _ ^\n' +
        '\n' +
        'Всем удачи!'],
    ['Lorem Ipsum',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius justo sed nulla gravida, euismod fringilla augue interdum. Duis porttitor eget lectus sed varius. Praesent ligula turpis, accumsan a faucibus eget, scelerisque at ex. Nunc sapien dolor, gravida quis vulputate eget, aliquet ut nisl. Nam id maximus nulla. Aenean interdum elementum scelerisque. Nullam rhoncus congue egestas. Aliquam sodales libero nec metus pellentesque, vel laoreet metus suscipit. Aliquam enim lorem, iaculis vitae elit ac, laoreet sollicitudin velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent in luctus libero. Cras iaculis, quam eget tristique finibus, enim urna tempor arcu, tincidunt posuere diam tortor at sem. Mauris iaculis metus ut orci accumsan fringilla. Nullam sagittis in diam id maximus. Duis fermentum ullamcorper commodo.\n' +
        '\n' +
        'Pellentesque magna augue, varius sed molestie quis, varius pharetra quam. Maecenas nec consequat libero, vitae sodales quam. Donec consectetur sapien turpis, sed ultricies lorem ornare a. Maecenas sit amet aliquam mauris, vel faucibus mi. Sed fringilla nisl justo, in volutpat velit imperdiet vestibulum. Aliquam in suscipit arcu, quis eleifend diam. Suspendisse a erat semper arcu porta faucibus ullamcorper sit amet nisl. Nam eleifend est nunc, id tincidunt mi feugiat id. Proin hendrerit eros efficitur orci venenatis efficitur. Sed sem arcu, scelerisque vel ultricies non, viverra sed lorem. Curabitur accumsan eros eu ante sollicitudin hendrerit. Cras ultricies, leo a accumsan aliquam, tortor magna feugiat lacus, ut maximus turpis lectus sed nunc. Vivamus sem augue, tincidunt eu suscipit eu, ornare id justo. Vivamus rutrum a est in blandit. Praesent facilisis massa ac est vestibulum aliquet. Nunc vitae odio mollis, pretium sapien quis, convallis ipsum.\n' +
        '\n' +
        'Nam lobortis in risus hendrerit laoreet. Sed venenatis, lectus id posuere feugiat, nulla lacus dictum orci, in venenatis dolor eros et lorem. Nulla laoreet, lectus eu auctor egestas, dolor lacus feugiat metus, vitae feugiat eros risus ut quam. Nam fringilla varius eros at vehicula. Maecenas posuere nisl dolor, ut aliquam ex viverra et. Duis ac mattis mauris, vel convallis mi. Ut erat velit, pulvinar sit amet eros vitae, dignissim suscipit sapien. In fermentum scelerisque libero id lacinia. Curabitur feugiat, neque at commodo fringilla, odio ligula lacinia purus, in posuere tortor libero vel justo. Ut posuere elementum mi, tristique condimentum nunc posuere eget. Aliquam erat volutpat. Sed vitae efficitur quam, sed faucibus neque. Vivamus id elit quis arcu varius placerat sit amet ac massa. Nam bibendum, turpis quis lobortis mollis, ante nisl cursus enim, non cursus mauris leo non quam. In vel erat commodo, tincidunt velit blandit, molestie risus.\n' +
        '\n' +
        'Sed justo elit, accumsan vel scelerisque id, tincidunt id enim. Aenean mollis ultrices libero a egestas. Fusce id hendrerit augue. Vestibulum quis sem imperdiet, sodales massa in, dignissim neque. Nullam iaculis velit at ligula tincidunt, ac aliquam diam laoreet. Fusce laoreet quis ipsum in tristique. Nunc semper diam non libero feugiat efficitur. Ut ultrices fermentum dui eget bibendum. Nulla turpis diam, congue et consequat nec, imperdiet lacinia tortor. Vestibulum et libero aliquam, laoreet ex quis, aliquam elit. Integer justo ante, posuere vel feugiat consequat, faucibus non diam. Aenean non tincidunt felis. Nullam euismod congue vulputate. Nullam maximus quam quis pulvinar lobortis. Donec convallis cursus tempor.\n' +
        '\n' +
        'Ut euismod justo posuere consectetur imperdiet. Nam viverra viverra scelerisque. Vestibulum interdum nunc purus, nec euismod sapien mattis ac. Morbi sed turpis euismod, imperdiet arcu ut, facilisis risus. Quisque id sodales odio, nec tristique nulla. Nunc sit amet augue dolor. Vestibulum varius augue ac lacus pulvinar tincidunt.'],
    ['Отчисление',
        'Вынужден сообщить, что вы все отчислены.']
];