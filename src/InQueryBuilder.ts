/***
 * Query builder that can take a new line separated list of strings
 * and return an SQL IN query template expression
 */
export default class InQueryBuilder {
    /**
     * A new line separated list of strings to build an expression for
     * @param text The text to parse
     */
    public getQuery(text: string): string  {
        // Parse as lines
        let lines = this.getLines(text);

        // Bail early if no valid lines
        if (lines.length === 0) {
            return '';
        }

        // Build IN expression
        const expression = lines.map(x => "\t'" + x + "'").join(",\n");
        return "(\n" + expression + "\n)";
    }

    /**
     * Return a list of lines (or a zero result set if empty text)
     * @param text The text to parse
     */
    private getLines(text: string): string[] {
        // If the text appears empty, skip early
        if (text.length === 0) {
            return [];
        }

        // Split by new lines
        return text.split(/\r?\n/).filter(x => x);
    }
}