import
{
    Accordion,
    AccordionTrigger,
    AccordionContent,
    AccordionItem,
} from "@/components/ui/accordion";
export default function page()
{
    return (
        <>
            <section className="w-full min-h-screen flex justify-center items-center py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-full max-w-4xl space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
                                Frequently Asked Questions
                            </h2>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="font-semibold text-lg">
                                        How do I start using CopyIn2Clicks?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        To start using CopyIn2Clicks, simply download and install
                                        the extension from the browser&apos;s web store. Once
                                        installed, click on the extension and follow the listed
                                        instructions to get started. If you are having issues, then
                                        refer back to the demo in our download page.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="font-semibold text-lg">
                                        What platforms does CopyIn2Clicks support?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        CopyIn2Clicks supports popular web browsers such as Chrome,
                                        Firefox, and Edge, across multiple operating systems
                                        including Windows and macOS.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="font-semibold text-lg">
                                        Is CopyIn2Clicks free to use?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Yes, CopyIn2Clicks is completely free to use.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}