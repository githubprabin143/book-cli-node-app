#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');
const {
  addBook,
  searchBook,
  findBookById,
  updateBook,
  removeBook,
  listBooks
} = require('./index');

// Book Questions
const addBookQuestions = [
  {
    type: 'input',
    name: 'bookname',
    message: 'Book Name'
  },
  {
    type: 'input',
    name: 'author',
    message: 'Author Full Name'
  },
  {
    type: 'input',
    name: 'price',
    message: 'Book Price'
  }
];

program 
  .version('1.0.0')
  .alias('v')
  .description('Book Management System');

// program
//   .command('add <bookname> <author> <price>')
//   .alias('a')
//   .description('Add a book')
//   .action((bookname, author, price) => {
//     addBook({bookname, author, price});
//   });

// Add Command
program
  .command('add')
  .alias('a')
  .description('Add a book')
  .action(() => {
    prompt(addBookQuestions).then(answers => addBook(answers));
  });

// Search Command
program
  .command('search <name>')
  .alias('s')
  .description('Search books')
  .action(name => searchBook(name));

// Find Book By Id Command
program
.command('find <_id>')
.alias('f')
.description('Find book by id')
.action(_id => findBookById(_id));

// Update Command
program
  .command('update <_id>')
  .alias('u')
  .description('Update a book')
  .action(_id => {
    prompt(addBookQuestions).then(answers =>{
      for (var propName in answers) {
        if (!answers[propName] || answers[propName]=="") {
          delete answers[propName];
        }
      }
      updateBook(_id,answers)
    });
  });

// Remove Command
program
  .command('remove <_id>')
  .alias('r')
  .description('Remove a book')
  .action(_id => removeBook(_id));

// List Command
program
  .command('list')
  .alias('l')
  .description('List all books')
  .action(() => listBooks());

program.parse(process.argv);
