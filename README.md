# PMKIN + Next.js Blog Example

Welcome to this project showcasing how to use [PMKIN](https://pmkin.io), a
headless CMS, with Next.js (App Router). This example demonstrates building a
simple blog application.

## Live Demo

Check out the live demo:
[https://pmkin-next-js-app-router-quick-start.vercel.app/](https://pmkin-next-js-app-router-quick-start.vercel.app/)

## Project Overview

This project demonstrates:

- Using PMKIN as a content backend
- Setting up Next.js with the App Router
- Querying PMKIN using GraphQL via Apollo Client
- Rendering markdown content with react-markdown

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/pmkin-cms/pmkin-next-js-app-router-quick-start.git
   ```

2. Install dependencies:

   ```
   cd pmkin-nextjs-example

   yarn
   ```

3. Create a `.env.local` file and add your PMKIN API key:

   ```
   PMKIN_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see
   the result.

## Project Structure

- `app/page.tsx`: The home page that fetches and lists blog posts.
- `app/posts/[slug]/page.tsx`: Handles individual blog post pages, fetching and
  rendering post content.
- `lib/apollo-client.ts`: Sets up Apollo Client for GraphQL queries to PMKIN's
  API.

## Customization

Feel free to modify this example to fit your needs. You can add styling,
incorporate additional features, or adapt it to your specific use case.

## Resources

For more information on how to use PMKIN with Next.js, check out the
[PMKIN documentation](https://pmkin.io/developers/docs/nextjs).

## Questions and Support

If you have any questions or run into issues, please create an issue in this
repository.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

Happy coding!
